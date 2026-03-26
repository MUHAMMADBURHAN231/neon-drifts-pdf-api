import express from 'express'
import puppeteer from 'puppeteer'
import QRCode from 'qrcode'
import { slipHTML, slipCSS } from './templates/slip'

const app = express()
app.use(express.json({ limit: '2mb' }))

// CORS — only allow your Vercel domain
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim())

app.use((req, res, next) => {
  const origin = req.headers.origin || ''
  if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Simple auth — shared secret between dashboard and this service
app.use((req, res, next) => {
  if (req.path === '/health') return next()
  const secret = process.env.PDF_API_SECRET
  if (secret && req.headers['x-api-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.post('/generate', async (req, res) => {
  const { orders } = req.body

  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ error: 'No orders provided' })
  }

  try {
    // Generate QR codes for all orders
    const ordersWithQR = await Promise.all(
      orders.map(async (order: { order_id: string; [key: string]: unknown }) => {
        const qr_base64 = await QRCode.toDataURL(order.order_id, {
          width: 150,
          margin: 1,
          color: { dark: '#000000', light: '#ffffff' },
        })
        // Strip the data:image/png;base64, prefix
        return { ...order, qr_base64: qr_base64.split(',')[1] }
      })
    )

    // Build full HTML: pairs of slips per A4 page
    const pages: string[] = []

    for (let i = 0; i < ordersWithQR.length; i += 2) {
      const top = ordersWithQR[i]
      const bottom = ordersWithQR[i + 1]

      pages.push(`
        <div class="page">
          ${slipHTML(top as Parameters<typeof slipHTML>[0])}
          <div class="cut-line"></div>
          ${bottom
            ? slipHTML(bottom as Parameters<typeof slipHTML>[0])
            : '<div class="slip blank"></div>'
          }
        </div>
      `)
    }

    const fullHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
${slipCSS}

@page {
  size: A4 portrait;
  margin: 0;
}

html, body {
  width: 210mm;
  margin: 0;
  padding: 0;
}

.page {
  width: 210mm;
  height: 297mm;
  display: flex;
  flex-direction: column;
  page-break-after: always;
}

.slip.blank {
  height: 148.5mm;
  background: white;
}
</style>
</head>
<body>
${pages.join('\n')}
</body>
</html>
    `

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // Allow Google Fonts to load for the Barlow Condensed font
    await page.setContent(fullHTML, { waitUntil: 'networkidle0', timeout: 15000 })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    await browser.close()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'attachment; filename="slips.pdf"',
    })

    res.send(Buffer.from(pdfBuffer))
  } catch (err) {
    console.error('PDF generation error:', err)
    res.status(500).json({ error: 'PDF generation failed', detail: String(err) })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`)
})

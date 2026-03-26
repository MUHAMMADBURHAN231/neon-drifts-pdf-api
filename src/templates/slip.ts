// Generates the HTML string for one slip given order data
// This is rendered by Puppeteer into a half-A4 block

interface SlipData {
  order_id: string
  customer_name: string
  phone: string
  address: string
  cod_amount: number
  size: string
  weight?: string
  notes?: string
  qr_base64: string // base64 PNG from qrcode lib
}

export function slipHTML(order: SlipData): string {
  return `
<div class="slip">
  <!-- ZONE 1: Header -->
  <div class="header">
    <div class="brand-block">
      <span class="brand-text">NEON DRIFTS</span>
    </div>
    <div class="logo-circle">
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
        <circle cx="30" cy="30" r="28" stroke="#FF6B00" stroke-width="2.5" fill="white"/>
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
          font-family="'Barlow Condensed', sans-serif" font-size="22" font-weight="800" fill="#FF6B00">ND</text>
      </svg>
    </div>
    <div class="waybill-block">
      <span class="waybill-label">Waybill No:</span>
      <span class="waybill-value">${order.order_id}</span>
    </div>
  </div>

  <!-- ZONE 2: Body -->
  <div class="body-row">
    <!-- Left: Receiver -->
    <div class="receiver-col">
      <div class="receiver-label">RECEIVER:</div>
      <div class="customer-name">${order.customer_name}</div>
      <div class="address">${order.address.replace(/\n/g, '<br/>')}</div>
      <div class="phone">${order.phone}</div>
      ${order.notes ? `<div class="notes">${order.notes}</div>` : ''}
    </div>

    <!-- Right: COD + QR -->
    <div class="cod-col">
      <div class="qr-wrap">
        <img src="data:image/png;base64,${order.qr_base64}" class="qr-img" alt="QR"/>
      </div>
      <div class="cod-label">COD STATUS/AMOUNT:</div>
      <div class="cod-amount">${order.cod_amount.toLocaleString()}</div>
      <div class="declared-label">DECLARED CONTENT:</div>
      <div class="declared-value">PARCEL · ${order.size}"</div>
      <div class="icons-row">
        <!-- Fragile -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C9.24 2 7 4.24 7 7c0 1.86.97 3.48 2.43 4.42L8 22h8l-1.43-10.58C16.03 10.48 17 8.86 17 7c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z"/></svg>
        </div>
        <!-- Upright -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M7 3l5-2 5 2v9l-5 3-5-3V3zm5 11l5-3v5l-5 3-5-3v-5l5 3z"/></svg>
        </div>
        <!-- Handle with care -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 1c-1.1 0-2 .9-2 2v7.5l-1.5-1.5c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83l4.5 4.5c.96.96 2.26 1.5 3.61 1.5H16c2.21 0 4-1.79 4-4V9c0-1.1-.9-2-2-2s-2 .9-2 2v1h-1V3c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <!-- Weatherproof -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
        </div>
      </div>
    </div>
  </div>

  <!-- ZONE 3: Footer -->
  <div class="footer-row">
    <div class="footer-item">
      <span class="footer-label">TRACK ONLINE</span>
      <span class="footer-val">neondrifts.com</span>
    </div>
    <div class="footer-item">
      <span class="footer-label">WEIGHT:</span>
      <span class="footer-val">${order.weight || '—'}</span>
    </div>
    <div class="footer-item footer-right">
      <span class="footer-label">SCAN ABOVE</span>
    </div>
  </div>
</div>
`
}

export const slipCSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800&family=DM+Sans:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: white;
  width: 210mm;
}

.slip {
  width: 210mm;
  height: 148.5mm;
  background: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #222;
  overflow: hidden;
}

/* ZONE 1 */
.header {
  display: flex;
  align-items: center;
  background: #FF6B00;
  padding: 10px 14px;
  gap: 12px;
  min-height: 52px;
}
.brand-block {
  flex: 1;
  background: #FF6B00;
  padding: 6px 14px;
  border-radius: 6px;
  border: 2.5px solid rgba(0,0,0,0.15);
}
.brand-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.logo-circle { flex-shrink: 0; }
.waybill-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}
.waybill-label {
  font-size: 11px;
  font-style: italic;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2px;
}
.waybill-value {
  background: #FF6B00;
  border: 2.5px solid white;
  border-radius: 6px;
  padding: 3px 10px;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.04em;
}

/* ZONE 2 */
.body-row {
  display: flex;
  flex: 1;
  border-top: 1.5px solid #222;
  overflow: hidden;
}
.receiver-col {
  flex: 1.15;
  padding: 10px 14px;
  border-right: 1.5px solid #222;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.receiver-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.customer-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #111;
  line-height: 1.1;
}
.address {
  font-size: 12px;
  color: #333;
  line-height: 1.5;
  flex: 1;
}
.phone {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-top: 4px;
}
.notes {
  font-size: 11px;
  color: #888;
  font-style: italic;
  margin-top: 2px;
}

.cod-col {
  flex: 1;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.qr-wrap {
  position: absolute;
  top: 8px;
  right: 10px;
}
.qr-img {
  width: 72px;
  height: 72px;
}
.cod-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #222;
  margin-bottom: 2px;
  padding-right: 84px;
}
.cod-amount {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 42px;
  font-weight: 800;
  color: #111;
  line-height: 1;
  margin-bottom: 8px;
}
.declared-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #222;
  margin-bottom: 2px;
}
.declared-value {
  font-size: 12px;
  color: #333;
  margin-bottom: 8px;
}
.icons-row {
  display: flex;
  gap: 6px;
  margin-top: auto;
}
.icon-box {
  width: 34px;
  height: 34px;
  background: #FF6B00;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ZONE 3 */
.footer-row {
  display: flex;
  align-items: center;
  border-top: 1.5px solid #222;
  padding: 6px 14px;
  min-height: 30px;
  gap: 0;
}
.footer-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}
.footer-right { justify-content: flex-end; }
.footer-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #222;
}
.footer-val {
  font-size: 12px;
  color: #444;
}

/* Cut line (shown between two slips on a page) */
.cut-line {
  width: 210mm;
  height: 0;
  border-bottom: 2px dashed #aaa;
  position: relative;
  margin: 0;
}
.cut-line::after {
  content: '✂  CUT HERE  ✂';
  position: absolute;
  left: 50%;
  top: -9px;
  transform: translateX(-50%);
  font-size: 10px;
  color: #aaa;
  background: white;
  padding: 0 8px;
  font-family: sans-serif;
  letter-spacing: 0.08em;
}
`

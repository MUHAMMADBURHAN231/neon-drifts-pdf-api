interface SlipData {
  order_id: string
  customer_name: string
  phone: string
  address: string
  cod_amount: number
  size: string
  weight?: string
  notes?: string
  qr_base64: string
}

export function slipHTML(order: SlipData): string {
  return `
<div class="slip">
  <div class="header">
    <div class="brand-block">
      <span class="brand-text">NEON DRIFTS</span>
    </div>
    <div class="logo-circle">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
        <circle cx="40" cy="40" r="38" stroke="#E8500A" stroke-width="2.5" fill="white"/>
        <text x="38" y="52" text-anchor="middle" font-family="'Black Han Sans', 'Arial Black', sans-serif" font-size="34" font-weight="900" fill="#E8500A">ND</text>
      </svg>
    </div>
    <div class="waybill-block">
      <span class="waybill-label"><em>Waybill No:</em></span>
      <div class="waybill-pill">${order.order_id}</div>
    </div>
  </div>

  <div class="body-row">
    <div class="receiver-col">
      <div class="receiver-label">RECEIVER:</div>
      <div class="customer-name">${order.customer_name}</div>
      <div class="address">${order.address.replace(/\n/g, '<br/>')}</div>
      <div class="phone">${order.phone}</div>
      ${order.notes ? `<div class="notes">Note: ${order.notes}</div>` : ''}
    </div>

    <div class="cod-col">
      <div class="cod-inner">
        <div class="cod-left">
          <div class="cod-label">COD STATUS/AMOUNT:</div>
          <div class="cod-amount">${order.cod_amount.toLocaleString()}</div>
          <div class="declared-label">DECLARED CONTENT:</div>
          <div class="declared-value">PARCEL</div>
        </div>
        <div class="qr-wrap">
          <img src="data:image/png;base64,${order.qr_base64}" class="qr-img" alt="QR"/>
        </div>
      </div>
      <div class="icons-container">
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M7 2h10l-1 7 3 3-7 10-7-10 3-3L7 2zm2.5 2l.7 5-2.5 2.5L12 19l4.3-7.5L13.8 9l.7-5H9.5z"/>
          </svg>
        </div>
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M8 11V17H16V11H20L12 3L4 11H8ZM8 19V21H16V19H8Z"/>
          </svg>
        </div>
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M12 3c-1.1 0-2 .9-2 2v6.5l-1.3-1.3c-.6-.6-1.5-.6-2.1 0-.6.6-.6 1.5 0 2.1l4.1 4.1c.8.8 1.9 1.3 3 1.3h2c1.7 0 3-1.3 3-3V9c0-1.1-.9-2-2-2-.3 0-.6.1-.9.2C15.7 6.5 14.9 6 14 6c-.4 0-.8.1-1.1.3C12.6 5.5 12.3 5 12 5V3z"/>
          </svg>
        </div>
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M12 2C7 2 3 6.5 3 12h9V2zm0 0c5 0 9 4.5 9 10h-9V2zM11 16c0 .6.4 1 1 1s1-.4 1-1v-4h-2v4z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-row">
    <div class="footer-left">
      <span class="footer-bold">TRACK ONLINE</span>
      <span class="footer-normal">neondrifts.com</span>
    </div>
    <div class="footer-centre">
      <span class="footer-bold">WEIGHT:</span>
      <span class="footer-normal">${order.weight || '—'}</span>
    </div>
    <div class="footer-right">
      <span class="footer-bold">SCAN ABOVE</span>
    </div>
  </div>
</div>
`
}

export const slipCSS = `
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: white;
  width: 210mm;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.slip {
  width: 210mm;
  height: 148.5mm;
  background: white;
  display: flex;
  flex-direction: column;
  border: 4px solid black;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0;
}

/* ── ZONE 1: HEADER ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 3px solid black;
  background: white;
  min-height: 70px;
}

.brand-block {
  background: #E8500A;
  border-radius: 8px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
}
.brand-text {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 38px;
  font-weight: 900;
  color: black;
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-transform: uppercase;
}

.logo-circle {
  flex-shrink: 0;
}

.waybill-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}
.waybill-label {
  font-size: 15px;
  font-style: italic;
  font-weight: 800;
  color: black;
}
.waybill-pill {
  background: #E8500A;
  border-radius: 8px;
  padding: 4px 16px;
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 26px;
  font-weight: 900;
  font-style: italic;
  color: black;
  letter-spacing: 0.02em;
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
}

/* ── ZONE 2: BODY ── */
.body-row {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: white;
}

/* LEFT col */
.receiver-col {
  width: 50%;
  padding: 20px 24px;
  border-right: 3px solid black;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.receiver-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 18px;
  font-weight: 900;
  color: black;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.customer-name {
  font-size: 22px;
  font-weight: 700;
  color: black;
  line-height: 1.2;
}
.address {
  font-size: 15px;
  color: #111;
  line-height: 1.5;
}
.phone {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: black;
  margin-top: 4px;
  letter-spacing: 0.02em;
}
.notes {
  font-size: 14px;
  color: #444;
  font-style: italic;
  margin-top: 6px;
}

/* RIGHT col */
.cod-col {
  width: 50%;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cod-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.cod-left {
  display: flex;
  flex-direction: column;
}
.cod-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: black;
  text-transform: uppercase;
  margin-bottom: 8px;
  line-height: 1.2;
}
.cod-amount {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 56px;
  font-weight: 900;
  color: black;
  line-height: 1;
  margin-bottom: 12px;
}
.declared-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: black;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.declared-value {
  font-size: 15px;
  color: #222;
}
.qr-wrap {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
}
.qr-img {
  width: 110px;
  height: 110px;
  display: block;
}

/* Icons container — orange pill with 4 icons */
.icons-container {
  background: #E8500A;
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: auto;
}
.icon-box {
  width: 42px;
  height: 42px;
  border: 2px solid black;
  background: #E8500A;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ── ZONE 3: FOOTER ── */
.footer-row {
  display: flex;
  align-items: center;
  border-top: 3px solid black;
  padding: 10px 24px;
  min-height: 42px;
  background: white;
}
.footer-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-centre {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.footer-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.footer-bold {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 15px;
  font-weight: 900;
  color: black;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.footer-normal {
  font-size: 15px;
  color: #222;
}

.cut-line {
  width: 210mm;
  height: 0;
  border-bottom: 2px dashed #999;
  position: relative;
}
.cut-line::after {
  content: '✂  CUT HERE  ✂';
  position: absolute;
  left: 50%;
  top: -9px;
  transform: translateX(-50%);
  font-size: 10px;
  color: #999;
  background: white;
  padding: 0 10px;
  font-family: Arial, sans-serif;
  letter-spacing: 0.1em;
}
`

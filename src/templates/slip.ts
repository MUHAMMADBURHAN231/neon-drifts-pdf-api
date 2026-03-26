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

  <!-- ZONE 1: Header — white background, black border box -->
  <div class="header">
    <!-- Left: orange rounded rectangle with NEON DRIFTS -->
    <div class="brand-block">
      <span class="brand-text">NEON DRIFTS</span>
    </div>

    <!-- Centre: ND circle logo -->
    <div class="logo-circle">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <circle cx="40" cy="40" r="36" stroke="#E8500A" stroke-width="3" fill="white"/>
        <text x="40" y="51" text-anchor="middle"
          font-family="'Black Han Sans', 'Barlow Condensed', sans-serif"
          font-size="30" font-weight="900" fill="#E8500A">ND</text>
      </svg>
    </div>

    <!-- Right: Waybill No label + orange pill -->
    <div class="waybill-block">
      <span class="waybill-label"><em>Waybill No:</em></span>
      <div class="waybill-pill">${order.order_id}</div>
    </div>
  </div>

  <!-- ZONE 2: Body split left/right -->
  <div class="body-row">

    <!-- LEFT: Receiver info -->
    <div class="receiver-col">
      <div class="receiver-label">RECEIVER:</div>
      <div class="customer-name">${order.customer_name}</div>
      <div class="address">${order.address.replace(/\n/g, '<br/>')}</div>
      <div class="phone">${order.phone}</div>
      ${order.notes ? `<div class="notes">${order.notes}</div>` : ''}
    </div>

    <!-- RIGHT: COD + QR + icons -->
    <div class="cod-col">
      <div class="cod-top">
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
      <!-- Icons row — orange pill container with 4 icons -->
      <div class="icons-container">
        <!-- Fragile / broken glass -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M7 2h10l-1 7 3 3-7 10-7-10 3-3L7 2zm2.5 2l.7 5-2.5 2.5L12 19l4.3-7.5L13.8 9l.7-5H9.5z"/>
          </svg>
        </div>
        <!-- This way up / arrows -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M8 11V17H16V11H20L12 3L4 11H8ZM8 19V21H16V19H8Z"/>
          </svg>
        </div>
        <!-- Handle with care / hands -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M12 3c-1.1 0-2 .9-2 2v6.5l-1.3-1.3c-.6-.6-1.5-.6-2.1 0-.6.6-.6 1.5 0 2.1l4.1 4.1c.8.8 1.9 1.3 3 1.3h2c1.7 0 3-1.3 3-3V9c0-1.1-.9-2-2-2-.3 0-.6.1-.9.2C15.7 6.5 14.9 6 14 6c-.4 0-.8.1-1.1.3C12.6 5.5 12.3 5 12 5V3z"/>
          </svg>
        </div>
        <!-- Keep dry / umbrella -->
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="black">
            <path d="M12 2C7 2 3 6.5 3 12h9V2zm0 0c5 0 9 4.5 9 10h-9V2zM11 16c0 .6.4 1 1 1s1-.4 1-1v-4h-2v4z"/>
          </svg>
        </div>
      </div>
    </div>

  </div>

  <!-- ZONE 3: Footer -->
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
  border: 2.5px solid black;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

/* ── ZONE 1: HEADER ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 2.5px solid black;
  background: white;
  min-height: 58px;
  gap: 12px;
}

.brand-block {
  background: #E8500A;
  border-radius: 10px;
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
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}
.waybill-label {
  font-size: 13px;
  font-style: italic;
  font-weight: 700;
  color: black;
}
.waybill-pill {
  background: #E8500A;
  border-radius: 8px;
  padding: 5px 16px;
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 26px;
  font-weight: 900;
  font-style: italic;
  color: black;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* ── ZONE 2: BODY ── */
.body-row {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* LEFT col */
.receiver-col {
  width: 52%;
  padding: 12px 16px;
  border-right: 2.5px solid black;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.receiver-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: black;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.customer-name {
  font-size: 18px;
  font-weight: 700;
  color: black;
  line-height: 1.2;
}
.address {
  font-size: 12.5px;
  color: #222;
  line-height: 1.55;
  flex: 1;
}
.phone {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: black;
  margin-top: 4px;
  letter-spacing: 0.02em;
}
.notes {
  font-size: 11px;
  color: #666;
  font-style: italic;
}

/* RIGHT col */
.cod-col {
  width: 48%;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cod-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
}
.cod-left {
  flex: 1;
}
.cod-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: black;
  text-transform: uppercase;
  margin-bottom: 2px;
  line-height: 1.2;
}
.cod-amount {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 52px;
  font-weight: 900;
  color: black;
  line-height: 1;
  margin-bottom: 8px;
}
.declared-label {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: black;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.declared-value {
  font-size: 13px;
  color: #222;
}
.qr-wrap {
  flex-shrink: 0;
}
.qr-img {
  width: 82px;
  height: 82px;
  display: block;
}

/* Icons container — orange pill with 4 icons */
.icons-container {
  background: #E8500A;
  border-radius: 10px;
  padding: 6px 10px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
.icon-box {
  width: 38px;
  height: 38px;
  border: 2px solid black;
  border-radius: 5px;
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
  border-top: 2.5px solid black;
  padding: 5px 16px;
  min-height: 28px;
  background: white;
}
.footer-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-centre {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.footer-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.footer-bold {
  font-family: 'Black Han Sans', Arial Black, sans-serif;
  font-size: 13px;
  font-weight: 900;
  color: black;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.footer-normal {
  font-size: 13px;
  color: #222;
}

/* Cut line between two slips on same A4 page */
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

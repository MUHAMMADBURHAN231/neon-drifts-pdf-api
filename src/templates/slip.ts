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

  <div class="zone1">
    <div class="brand-pill">NEON DRIFTS</div>
    <div class="nd-logo">
      <svg viewBox="0 0 100 100" width="70" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" stroke="#E8500A" stroke-width="4" fill="white"/>
        <text x="50" y="66" text-anchor="middle"
          font-family="Arial Black, sans-serif"
          font-size="38" font-weight="900" fill="#E8500A">ND</text>
      </svg>
    </div>
    <div class="waybill">
      <div class="waybill-label">Waybill No:</div>
      <div class="waybill-pill">${order.order_id}</div>
    </div>
  </div>

  <div class="zone2">
    <div class="left-col">
      <div class="receiver-label">RECEIVER:</div>
      <div class="cust-name">${order.customer_name}</div>
      <div class="cust-address">${order.address.replace(/\n/g, '<br/>')}</div>
      <div class="cust-phone">${order.phone}</div>
    </div>

    <div class="right-col">
      <div class="right-top">
        <div class="right-top-left">
          <div class="cod-label">COD STATUS/AMOUNT:</div>
          <div class="cod-amount">${order.cod_amount.toLocaleString()}</div>
          <div class="declared-label">DECLARED CONTENT:</div>
          <div class="declared-val">PARCEL</div>
        </div>
        <div class="qr-block">
          <img src="data:image/png;base64,${order.qr_base64}" width="90" height="90" alt="QR"/>
        </div>
      </div>
      <div class="icons-pill">
        <div class="icon-cell">
          <svg viewBox="0 0 64 64" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="black" stroke-width="4"/>
            <ellipse cx="32" cy="22" rx="10" ry="10" fill="none" stroke="black" stroke-width="3.5"/>
            <line x1="26" y1="29" x2="22" y2="52" stroke="black" stroke-width="3.5"/>
            <line x1="38" y1="29" x2="42" y2="52" stroke="black" stroke-width="3.5"/>
            <line x1="22" y1="52" x2="42" y2="52" stroke="black" stroke-width="3.5"/>
          </svg>
        </div>
        <div class="icon-cell">
          <svg viewBox="0 0 64 64" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="black" stroke-width="4"/>
            <polygon points="32,10 18,30 27,30 27,54 37,54 37,30 46,30" fill="black"/>
          </svg>
        </div>
        <div class="icon-cell">
          <svg viewBox="0 0 64 64" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="black" stroke-width="4"/>
            <path d="M18 44 Q18 30 32 24 Q46 30 46 44" fill="none" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M14 46 Q18 38 32 32 Q46 38 50 46" fill="none" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
            <circle cx="32" cy="20" r="5" fill="black"/>
          </svg>
        </div>
        <div class="icon-cell">
          <svg viewBox="0 0 64 64" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="56" height="56" rx="4" fill="none" stroke="black" stroke-width="4"/>
            <path d="M32 10 C18 10 10 20 10 30 L30 30 L30 52 C30 53 31 54 32 54 C33 54 34 53 34 52 L34 30 L54 30 C54 20 46 10 32 10Z" fill="black"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="zone3">
    <div class="footer-left"><span class="f-bold">TRACK ONLINE</span> <span class="f-reg">neondrifts.com</span></div>
    <div class="footer-mid"><span class="f-bold">WEIGHT:</span> <span class="f-reg">${order.weight || '—'}</span></div>
    <div class="footer-right"><span class="f-bold">SCAN ABOVE</span></div>
  </div>

</div>
`
}

export const slipCSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: white;
  width: 210mm;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.slip {
  width: 210mm;
  /* DONT set fixed height so the border perfectly encapsulates the content */
  background: white;
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  margin-bottom: 5mm; /* To separate slips slightly if rendering multiple */
}

.zone1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 3px solid black;
  background: white;
  /* Removed fixed height so it scales nicely */
  gap: 15px;
  flex-shrink: 0;
}
.brand-pill {
  background: #E8500A;
  border-radius: 12px;
  padding: 12px 26px;
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 46px;
  font-weight: 700;
  color: black;
  letter-spacing: 0.01em;
  white-space: nowrap;
  line-height: 1;
}
.nd-logo { flex-shrink: 0; }
.waybill { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
.waybill-label { font-size: 15px; font-style: italic; font-weight: 700; color: black; }
.waybill-pill {
  background: #E8500A;
  border-radius: 8px;
  padding: 6px 18px;
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 32px;
  font-weight: 700;
  font-style: italic;
  color: black;
  letter-spacing: 0.02em;
  white-space: nowrap;
  line-height: 1.1;
}

/* Removed flex: 1 so it doesn't stretch down */
.zone2 { display: flex; overflow: hidden; }

.left-col {
  width: 52%;
  border-right: 3px solid black;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px; /* Elements will neatly stack on top of each other */
}
.receiver-label {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 19px; font-weight: 700; color: black; letter-spacing: 0.04em; margin-bottom: 4px;
}
.cust-name { font-size: 21px; font-weight: 700; color: black; line-height: 1.2; }
/* REMOVED flex: 1 from address */
.cust-address { font-size: 15px; color: #111; line-height: 1.5; margin-bottom: 6px; }
.cust-phone {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 26px; font-weight: 700; color: black; letter-spacing: 0.02em;
}

/* Removed justify-content: space-between */
.right-col { width: 48%; padding: 16px 20px; display: flex; flex-direction: column; gap: 16px; }
/* Removed flex: 1 */
.right-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.right-top-left { flex: 1; }
.cod-label {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: black;
  text-transform: uppercase; margin-bottom: 4px; line-height: 1.2;
}
.cod-amount {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 58px; font-weight: 700; color: black; line-height: 1; margin-bottom: 12px;
}
.declared-label {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: black;
  text-transform: uppercase; margin-bottom: 2px;
}
.declared-val { font-size: 15px; color: #222; }
.qr-block { flex-shrink: 0; margin-top: -5px; } /* Slightly lift QR code to perfectly align visually */

.icons-pill {
  background: #E8500A;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  align-self: flex-end; /* Align to the right perfectly under the QR code */
  flex-shrink: 0;
}
.icon-cell {
  width: 44px; height: 44px;
  border: 2.5px solid black; border-radius: 4px;
  background: #E8500A;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}

.zone3 {
  display: flex; align-items: center;
  border-top: 3px solid black;
  padding: 5px 16px; height: 30px; flex-shrink: 0; background: white;
}
.footer-left { flex: 1; display: flex; gap: 8px; align-items: center; }
.footer-mid  { flex: 1; display: flex; gap: 6px; align-items: center; justify-content: center; }
.footer-right{ flex: 1; display: flex; justify-content: flex-end; }
.f-bold {
  font-family: 'Oswald', Arial Black, sans-serif;
  font-size: 13px; font-weight: 700; color: black; letter-spacing: 0.05em; text-transform: uppercase;
}
.f-reg { font-size: 13px; color: #222; }

.cut-line { width: 210mm; height: 0; border-bottom: 2px dashed #aaa; position: relative; }
.cut-line::after {
  content: '✂  CUT HERE  ✂';
  position: absolute; left: 50%; top: -9px; transform: translateX(-50%);
  font-size: 10px; color: #aaa; background: white; padding: 0 10px;
  font-family: Arial, sans-serif; letter-spacing: 0.1em;
}
`

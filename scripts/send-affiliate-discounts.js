// Usage: node scripts/send-affiliate-discounts.js
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

const resend = new Resend('re_SRTxciYw_8QfCNY8r45eubUQMW3TxDkmG');
const AFFILIATE_FILE = path.join(__dirname, '../affiliate-claims.json');

function randomDiscount() {
  // 4.99% to 14.99%, rounded to 2 decimals
  return (Math.random() * (14.99 - 4.99) + 4.99).toFixed(2);
}

async function sendDiscounts() {
  if (!fs.existsSync(AFFILIATE_FILE)) {
    console.log('No affiliate claims found.');
    return;
  }
  const claims = JSON.parse(fs.readFileSync(AFFILIATE_FILE, 'utf-8'));
  let sent = 0;
  for (const claim of claims) {
    if (claim.notified) continue;
    const discount = randomDiscount();
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: claim.email,
        subject: `Your Exclusive TRYKON Drop Discount!`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 0; margin: 0;">
            <div style="max-width: 480px; margin: 40px auto; background: #18181b; border-radius: 18px; box-shadow: 0 8px 32px #0002; overflow: hidden; border: 1px solid #222;">
              <div style="background: linear-gradient(90deg, #facc15 0%, #ec4899 100%); padding: 32px 0 16px 0; text-align: center;">
                <span style="font-size: 2.5rem; font-weight: 900; letter-spacing: 0.1em; color: #fff; text-shadow: 0 2px 16px #0008;">TRYKON</span>
                <div style="font-size: 1.1rem; color: #fff9; margin-top: 8px; font-weight: 500;">Premium Fitness Wear for Champions</div>
              </div>
              <div style="padding: 32px 28px 24px 28px;">
                <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; color: #facc15;">Your Exclusive Drop Discount!</h2>
                <p style="font-size: 1.1rem; color: #fff; margin-bottom: 18px;">The TRYKON drop is almost here. As an early affiliate, you get an exclusive discount for launch day only.</p>
                <div style="margin: 24px 0 18px 0;">
                  <div style="font-size: 1.1rem; color: #fff9; margin-bottom: 6px;">Your Discount</div>
                  <div style="background: linear-gradient(90deg, #22c55e 0%, #3b82f6 100%); color: #fff; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.1em; border-radius: 10px; padding: 16px 0; text-align: center; box-shadow: 0 2px 12px #22c55e33;">${discount}% OFF</div>
                </div>
                <div style="margin: 18px 0 18px 0; font-size: 1rem; color: #fff9;">
                  <strong>Discount Code:</strong> <span style="color:#facc15;">EARLY1337</span><br/>
                  <strong>Valid on:</strong> Drop Day Only<br/>
                  <strong>Date:</strong> <span style="color:#facc15;">${new Date().toLocaleDateString()}</span>
                </div>
                <div style="margin: 24px 0 0 0; padding: 16px; background: linear-gradient(90deg, #f59e42 0%, #f43f5e 100%); color: #fff; border-radius: 10px; font-weight: 600; font-size: 1rem; box-shadow: 0 2px 12px #f59e4233;">
                  ⚡ Use your code at checkout. This is a one-time, exclusive offer for you!
                </div>
                <div style="margin-top: 32px; color: #fff7; font-size: 0.95rem; text-align: center;">Thank you for supporting the future of Indian gymwear.<br/>- The TRYKON Team</div>
              </div>
            </div>
          </div>
        `
      });
      claim.notified = true;
      sent++;
      console.log(`Sent to ${claim.email} (${discount}%)`);
    } catch (e) {
      console.error(`Failed to send to ${claim.email}:`, e);
    }
  }
  fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(claims, null, 2));
  console.log(`Done. Sent ${sent} discount emails.`);
}

sendDiscounts(); 
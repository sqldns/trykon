import fs from 'fs'
import path from 'path'
import { Resend } from 'resend'

const resend = new Resend('re_SRTxciYw_8QfCNY8r45eubUQMW3TxDkmG')
const AFFILIATE_FILE = process.env.VERCEL ? '/tmp/affiliate-claims.json' : path.join(process.cwd(), 'affiliate-claims.json')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email, ip } = req.body
  if (!email || !ip) return res.status(400).json({ error: 'Missing email or IP' })

  let claims = []
  try {
    if (fs.existsSync(AFFILIATE_FILE)) {
      const data = fs.readFileSync(AFFILIATE_FILE, 'utf-8')
      claims = JSON.parse(data)
    }
  } catch (e) {
    // ignore
  }

  // Check for existing claim by IP or email
  const alreadyClaimed = claims.find(c => c.ip === ip || c.email === email)
  if (alreadyClaimed) {
    return res.status(429).json({ error: 'Already claimed' })
  }

  // Add new claim
  const claim = { email, ip, date: new Date().toISOString() }
  claims.push(claim)
  try {
    fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(claims, null, 2))
  } catch (e) {
    return res.status(500).json({ error: 'Failed to save claim' })
  }

  // Send affiliate email using Resend
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Congrats! You're now an official TRYKON Affiliate",
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 0; margin: 0;">
          <div style="max-width: 480px; margin: 40px auto; background: #18181b; border-radius: 18px; box-shadow: 0 8px 32px #0002; overflow: hidden; border: 1px solid #222;">
            <div style="background: linear-gradient(90deg, #facc15 0%, #ec4899 100%); padding: 32px 0 16px 0; text-align: center;">
              <span style="font-size: 2.5rem; font-weight: 900; letter-spacing: 0.1em; color: #fff; text-shadow: 0 2px 16px #0008;">TRYKON</span>
              <div style="font-size: 1.1rem; color: #fff9; margin-top: 8px; font-weight: 500;">Premium Fitness Wear for Champions</div>
            </div>
            <div style="padding: 32px 28px 24px 28px;">
              <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; color: #facc15;">Welcome to the TRYKON Affiliate Program!</h2>
              <p style="font-size: 1.1rem; color: #fff; margin-bottom: 18px;">Congrats, you've successfully signed up for our exclusive gymwear affiliate program. You're officially part of the movement.</p>
              <div style="margin: 24px 0 18px 0;">
                <div style="font-size: 1.1rem; color: #fff9; margin-bottom: 6px;">Your Early Access Code</div>
                <div style="background: linear-gradient(90deg, #22c55e 0%, #3b82f6 100%); color: #fff; font-size: 1.6rem; font-weight: 800; letter-spacing: 0.1em; border-radius: 10px; padding: 16px 0; text-align: center; box-shadow: 0 2px 12px #22c55e33;">EARLY1337</div>
              </div>
              <div style="margin: 18px 0 18px 0; font-size: 1rem; color: #fff9;">
                <strong>IP Address:</strong> <span style="color:#facc15;">${ip}</span><br/>
                <strong>Date:</strong> <span style="color:#facc15;">${claim.date}</span>
              </div>
              <div style="margin: 24px 0 0 0; padding: 16px; background: linear-gradient(90deg, #f59e42 0%, #f43f5e 100%); color: #fff; border-radius: 10px; font-weight: 600; font-size: 1rem; box-shadow: 0 2px 12px #f59e4233;">
                ⚠️ <strong>Warning:</strong> Please do not attempt to sign up again on the affiliate link. Multiple signups are not allowed and may result in disqualification.
              </div>
              <div style="margin-top: 32px; color: #fff7; font-size: 0.95rem; text-align: center;">Thank you for supporting the future of Indian gymwear.<br/>- The TRYKON Team</div>
            </div>
          </div>
        </div>
      `
    })
  } catch (e) {
    console.error('Resend error:', e);
    return res.status(500).json({ error: 'Failed to send email', details: e.message || e.toString() });
  }

  return res.status(200).json({ success: true })
} 
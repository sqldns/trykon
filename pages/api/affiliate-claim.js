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
  const claim = { email, ip, date: new Date().toISOString(), notified: false }
  claims.push(claim)
  try {
    fs.writeFileSync(AFFILIATE_FILE, JSON.stringify(claims, null, 2))
  } catch (e) {
    return res.status(500).json({ error: 'Failed to save claim' })
  }

  // Do NOT send email now
  return res.status(200).json({ success: true })
} 
import { validateAdminPassword, setAdminSession } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { password } = req.body

  if (validateAdminPassword(password)) {
    setAdminSession(res)
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ success: false, error: 'Invalid password' })
}

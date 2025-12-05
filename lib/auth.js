// Basit admin şifresi (üretime: env variable kullan)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export function validateAdminPassword(password) {
  return password === ADMIN_PASSWORD
}

export function setAdminSession(res) {
  res.setHeader(
    'Set-Cookie',
    `adminAuth=true; Path=/; HttpOnly; SameSite=Strict`
  )
}

export function getAdminSession(req) {
  const cookie = req.headers.cookie || ''
  return cookie.includes('adminAuth=true')
}

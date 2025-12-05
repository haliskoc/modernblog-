import { getAdminSession } from '../../../lib/auth'
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Admin kontrolü
  if (!getAdminSession(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { slug, content } = req.body

  if (!slug || !content) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const postsDir = path.join(process.cwd(), 'content', 'posts')
    
    // Klasörün varlığını kontrol et
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true })
    }

    const filePath = path.join(postsDir, `${slug}.md`)

    // Dosya zaten varsa hata ver
    if (fs.existsSync(filePath)) {
      return res.status(400).json({ error: 'Post already exists' })
    }

    // Dosyayı oluştur
    fs.writeFileSync(filePath, content, 'utf-8')

    return res.status(200).json({ success: true, slug })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error: ' + error.message })
  }
}

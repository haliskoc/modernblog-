import { getAdminSession } from '../../../lib/auth'
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Admin kontrolü
  if (!getAdminSession(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { slug } = req.body

  if (!slug) {
    return res.status(400).json({ error: 'Missing slug' })
  }

  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Post not found' })
    }

    fs.unlinkSync(filePath)

    return res.status(200).json({ success: true, slug })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error: ' + error.message })
  }
}

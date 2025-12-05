import { getAdminSession } from '../../../lib/auth'
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Admin kontrolü
  if (!getAdminSession(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { slug, title, description, content, category, imageUrl } = req.body

  if (!slug || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Markdown formatında dosya güncelle (frontmatter ile)
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().split('T')[0]}"
description: "${(description || '').replace(/"/g, '\\"')}"
category: "${category || 'Tutorial'}"
${imageUrl ? `image: "${imageUrl}"` : ''}
---

${content}`

    fs.writeFileSync(filePath, frontmatter, 'utf-8')

    return res.status(200).json({ success: true, slug })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error: ' + error.message })
  }
}

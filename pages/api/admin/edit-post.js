import { getAdminSession } from '../../../lib/auth'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!getAdminSession(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { slug, title, description, content, category, imageUrl } = req.body

  if (!slug || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .update({
        title,
        description,
        content,
        category,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)
      .select()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Post not found' })
    }

    return res.status(200).json({ success: true, slug, data })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error: ' + error.message })
  }
}

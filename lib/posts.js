import { supabaseAdmin } from './supabase'
import { remark } from 'remark'
import html from 'remark-html'

export async function getSortedPostsData() {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      return []
    }

    return posts || []
  } catch (err) {
    console.error('Exception fetching posts:', err)
    return []
  }
}

export async function getAllPostSlugs() {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select('slug')

    if (error) {
      console.error('Error fetching slugs:', error)
      return []
    }

    return (posts || []).map(post => ({ params: { slug: post.slug } }))
  } catch (err) {
    console.error('Exception fetching slugs:', err)
    return []
  }
}

export async function getPostData(slug) {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !posts) {
      console.error('Post not found:', slug)
      return null
    }

    const processedContent = await remark()
      .use(html)
      .process(posts.content)
    const contentHtml = processedContent.toString()

    return {
      slug: posts.slug,
      title: posts.title,
      description: posts.description,
      category: posts.category,
      image: posts.image_url,
      contentHtml,
      created_at: posts.created_at,
      updated_at: posts.updated_at
    }
  } catch (err) {
    console.error('Exception fetching post:', err)
    return null
  }
}

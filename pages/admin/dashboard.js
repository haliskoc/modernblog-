import { getAdminSession } from '../../lib/auth'
import { getSortedPostsData } from '../../lib/posts'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'

export default function AdminDashboard({ posts, isAdmin }) {
  const router = useRouter()
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: 'Voxel Author',
    content: ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="card-block p-8 text-center">
          <p className="font-pixel text-[0.6rem] text-accent">YETKISIZ ERİŞİM</p>
          <button
            onClick={() => router.push('/admin')}
            className="btn-minecraft mt-4"
          >
            GİRİŞ YAP
          </button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    document.cookie = 'adminAuth=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/admin')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, '-')
      const date = new Date().toISOString().split('T')[0]
      const frontmatter = `---\ntitle: "${formData.title}"\ndate: "${date}"\nauthor: "${formData.author}"\nexcerpt: "${formData.excerpt}"\n---\n\n`
      const content = frontmatter + formData.content

      const res = await fetch('/api/admin/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content })
      })

      const data = await res.json()

      if (data.success) {
        setMessage('✅ Yazı başarıyla oluşturuldu!')
        setFormData({ title: '', excerpt: '', author: 'Voxel Author', content: '' })
        setShowNewPostForm(false)
        setTimeout(() => router.reload(), 1000)
      } else {
        setMessage('❌ Hata: ' + (data.error || 'Bilinmeyen hata'))
      }
    } catch (err) {
      setMessage('❌ Bağlantı hatası')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-[var(--color-bg)]">
        {/* Admin Header */}
        <header className="bg-[var(--color-surface)] border-b-4 border-primary p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-2 border-primary-dark flex items-center justify-center">
                <span className="font-pixel text-white text-sm">🛠️</span>
              </div>
              <div>
                <div className="font-pixel text-sm text-primary">ADMIN DASHBOARD</div>
                <div className="font-pixel text-[0.5rem] text-[var(--color-muted)]">Yazı ve İçerik Yönetimi</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="font-pixel text-[0.6rem] px-4 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors"
            >
              ÇIKIŞ
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* New Post Button */}
          <div className="mb-8">
            {!showNewPostForm && (
              <button
                onClick={() => setShowNewPostForm(true)}
                className="btn-minecraft"
              >
                + YENİ YAZILAR
              </button>
            )}
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <div className="card-block p-8 mb-8 max-w-2xl">
              <h2 className="font-pixel text-lg text-primary mb-6">YENİ YAZILAR OLUŞTUR</h2>

              {message && (
                <div className={`p-4 mb-4 border-2 font-pixel text-[0.6rem] ${
                  message.includes('✅') 
                    ? 'bg-primary border-primary-dark text-white' 
                    : 'bg-accent border-accent-dark text-white'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    BAŞLIK
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Yazı başlığı..."
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    ÖZET
                  </label>
                  <input
                    type="text"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Kısa özet..."
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    YAZAR
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    İÇERİK (MARKDOWN)
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="## Başlık&#10;&#10;Yazı içeriğini buraya yaz..."
                    rows={8}
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm focus:border-primary focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-minecraft"
                  >
                    {saving ? 'KAYDEDILIYOR...' : 'KAYDET'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="btn-secondary"
                  >
                    İPTAL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts List */}
          <div>
            <h2 className="font-pixel text-lg text-primary mb-6">YAZILAR ({posts.length})</h2>
            <div className="grid gap-4">
              {posts.map(post => (
                <div key={post.slug} className="card-block p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-pixel text-[0.65rem] text-[var(--color-text)]">{post.title.toUpperCase()}</h3>
                    <div className="font-pixel text-[0.5rem] text-[var(--color-muted)] mt-1">
                      {post.date} • {post.author}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 font-pixel text-[0.5rem] border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      GÖRÜNTÜLE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export function getServerSideProps({ req }) {
  const isAdmin = getAdminSession(req)

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  const posts = getSortedPostsData()

  return {
    props: { posts, isAdmin: true }
  }
}

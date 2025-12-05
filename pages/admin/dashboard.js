import { getAdminSession } from '../../lib/auth'
import { getSortedPostsData } from '../../lib/posts'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'

export default function AdminDashboard({ posts, isAdmin }) {
  const router = useRouter()
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [editingSlug, setEditingSlug] = useState(null)
  const [postsList, setPostsList] = useState(posts)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tutorial',
    content: '',
    imageUrl: ''
  })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
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

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Tutorial',
      content: '',
      imageUrl: ''
    })
    setEditingSlug(null)
    setShowNewPostForm(false)
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const slug = editingSlug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const res = await fetch(editingSlug ? '/api/admin/edit-post' : '/api/admin/create-post', {
        method: editingSlug ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          slug, 
          title: formData.title,
          description: formData.description,
          category: formData.category,
          content: formData.content,
          imageUrl: formData.imageUrl
        })
      })

      const data = await res.json()

      if (data.success) {
        const action = editingSlug ? 'güncellendi' : 'oluşturuldu'
        setMessage(`✅ Yazı başarıyla ${action}!`)
        resetForm()
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

  const handleDeletePost = async (slug) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return

    setDeleting(slug)
    setMessage('')

    try {
      const res = await fetch('/api/admin/delete-post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      })

      const data = await res.json()

      if (data.success) {
        setMessage('✅ Yazı başarıyla silindi!')
        setPostsList(postsList.filter(p => p.slug !== slug))
      } else {
        setMessage('❌ Hata: ' + (data.error || 'Silme başarısız'))
      }
    } catch (err) {
      setMessage('❌ Bağlantı hatası')
    } finally {
      setDeleting(null)
    }
  }

  const handleEditPost = (post) => {
    setEditingSlug(post.slug)
    setFormData({
      title: post.title,
      description: post.description || '',
      category: post.category || 'Tutorial',
      content: post.content || '',
      imageUrl: post.image || ''
    })
    setShowNewPostForm(true)
  }

  const handlePreviewPost = (slug) => {
    window.open(`/posts/${slug}`, '_blank')
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-[var(--color-bg)]">
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
          {message && (
            <div className={`p-4 mb-6 border-2 font-pixel text-[0.6rem] ${
              message.includes('✅') 
                ? 'bg-primary border-primary-dark text-white' 
                : 'bg-accent border-accent-dark text-white'
            }`}>
              {message}
            </div>
          )}

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

          {showNewPostForm && (
            <div className="card-block p-8 mb-8 max-w-3xl">
              <h2 className="font-pixel text-lg text-primary mb-6">
                {editingSlug ? 'YAZIRI DÜZENLE' : 'YENİ YAZILAR OLUŞTUR'}
              </h2>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    BAŞLIK *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Yazı başlığı..."
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                    required
                    disabled={editingSlug}
                  />
                </div>

                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    AÇIKLAMA (SEO)
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Kısa açıklama..."
                    maxLength="160"
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                  />
                  <div className="text-[0.5rem] text-[var(--color-muted)] mt-1">
                    {formData.description.length}/160
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                      KATEGORİ
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                    >
                      <option>Tutorial</option>
                      <option>İpucu</option>
                      <option>Rehber</option>
                      <option>Haberi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                      KAPAK RESMİ (URL)
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-w-xs border-2 border-[var(--color-border)]"
                      onError={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                    />
                  </div>
                )}

                <div>
                  <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                    İÇERİK (MARKDOWN) *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="## Başlık&#10;&#10;Yazı içeriğini buraya yaz..."
                    rows={10}
                    className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm focus:border-primary focus:outline-none resize-none"
                    required
                  />
                  <div className="text-[0.5rem] text-[var(--color-muted)] mt-1">
                    Markdown formatında yazabilirsiniz
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-minecraft"
                  >
                    {saving ? 'KAYDEDILIYOR...' : editingSlug ? 'GÜNCELLE' : 'KAYDET'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    İPTAL
                  </button>
                </div>
              </form>
            </div>
          )}

          <div>
            <h2 className="font-pixel text-lg text-primary mb-6">YAZILAR ({postsList.length})</h2>
            <div className="grid gap-4">
              {postsList.length === 0 ? (
                <div className="card-block p-8 text-center">
                  <p className="font-pixel text-[0.6rem] text-[var(--color-muted)]">Henüz yazı yok</p>
                </div>
              ) : (
                postsList.map(post => (
                  <div key={post.slug} className="card-block p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-pixel text-[0.65rem] text-[var(--color-text)]">
                          {post.title.toUpperCase()}
                        </h3>
                        {post.description && (
                          <p className="text-[0.55rem] text-[var(--color-muted)] mt-1">
                            {post.description}
                          </p>
                        )}
                        <div className="font-pixel text-[0.5rem] text-[var(--color-muted)] mt-2 flex gap-3">
                          <span>{post.date}</span>
                          {post.category && <span>• {post.category}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handlePreviewPost(post.slug)}
                          className="px-3 py-1 font-pixel text-[0.5rem] border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
                        >
                          👁️ GÖRÜNTÜLE
                        </button>
                        <button
                          onClick={() => handleEditPost(post)}
                          className="px-3 py-1 font-pixel text-[0.5rem] border-2 border-accent text-accent hover:bg-accent hover:text-white transition-colors whitespace-nowrap"
                        >
                          ✏️ DÜZENLE
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          disabled={deleting === post.slug}
                          className="px-3 py-1 font-pixel text-[0.5rem] border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors whitespace-nowrap disabled:opacity-50"
                        >
                          {deleting === post.slug ? '...' : '🗑️ SİL'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const isAdmin = getAdminSession(req)

  if (!isAdmin) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  const posts = await getSortedPostsData()

  return {
    props: { posts, isAdmin: true }
  }
}

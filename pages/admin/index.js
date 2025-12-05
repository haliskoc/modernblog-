import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (data.success) {
        router.push('/admin/dashboard')
      } else {
        setError('Şifre yanlış')
      }
    } catch (err) {
      setError('Bağlantı hatası')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin - Giriş</title>
      </Head>
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
        <div className="card-block p-8 max-w-sm w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary border-3 border-primary-dark flex items-center justify-center" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
              <span className="font-pixel text-white text-lg">🔐</span>
            </div>
          </div>

          <h1 className="font-pixel text-lg text-center text-primary mb-6">ADMIN GİRİŞ</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-pixel text-[0.6rem] text-[var(--color-muted)] mb-2">
                ŞİFRE
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifreyi gir..."
                className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
                style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.1)' }}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 bg-accent border-2 border-accent-dark text-white font-pixel text-[0.5rem]">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-minecraft w-full"
            >
              {loading ? 'Kontrol ediliyor...' : 'GİR'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

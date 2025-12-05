import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header(){
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setDark(!dark)
    if (!dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="bg-[var(--color-surface)] border-b-4 border-[var(--color-border)]" style={{ boxShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary border-2 border-primary-dark relative" style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>
            <div className="absolute inset-1 bg-grass opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-dirt"></div>
          </div>
          <span className="font-pixel text-xs text-primary group-hover:text-accent transition-colors">VOXEL BLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link href="/" className="px-3 py-2 font-pixel text-[0.6rem] hover:bg-primary hover:text-white transition-colors border-2 border-transparent hover:border-primary-dark">
            HOME
          </Link>
          <Link href="/posts" className="px-3 py-2 font-pixel text-[0.6rem] hover:bg-primary hover:text-white transition-colors border-2 border-transparent hover:border-primary-dark">
            POSTS
          </Link>
          <Link href="/ideas" className="px-3 py-2 font-pixel text-[0.6rem] hover:bg-accent hover:text-white transition-colors border-2 border-transparent hover:border-accent-dark">
            IDEAS
          </Link>
          <Link href="/about" className="px-3 py-2 font-pixel text-[0.6rem] hover:bg-cream transition-colors border-2 border-transparent hover:border-cream-dark">
            ABOUT
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="ml-4 w-10 h-10 flex items-center justify-center border-3 border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-cream transition-colors"
            style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}

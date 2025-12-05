import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home(){
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        {/* Decorative blocks */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-grass border-2 border-primary-dark opacity-50" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}></div>
        <div className="absolute top-12 left-16 w-6 h-6 bg-dirt border-2 border-stone opacity-50"></div>
        <div className="absolute bottom-8 right-8 w-10 h-10 bg-stone border-2 border-gray-600 opacity-50" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}></div>
        <div className="absolute bottom-16 right-20 w-5 h-5 bg-primary border-2 border-primary-dark opacity-50"></div>

        <h1 className="font-pixel text-xl md:text-2xl text-primary leading-relaxed">
          BUILD, SHARE & DISCOVER
        </h1>
        <p className="font-pixel text-accent text-sm mt-2">VOXEL CREATIVITY</p>
        <p className="mt-6 text-[var(--color-muted)] max-w-xl mx-auto font-body">
          Practical guides, inspiring builds, and bite-sized ideas inspired by blocky aesthetics. Join our community of builders.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/posts" className="btn-minecraft">
            Read Latest
          </Link>
          <Link href="/ideas" className="btn-secondary">
            Share Idea
          </Link>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <article className="card-block p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-grass border border-primary-dark"></div>
            <h3 className="font-pixel text-[0.65rem] text-primary">FEATURED TUTORIAL</h3>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-body">
            How to build a cozy mountain cabin — step-by-step voxel guide with materials list.
          </p>
          <Link href="/posts/cozy-cabin" className="inline-block mt-4 font-pixel text-[0.5rem] text-accent hover:text-primary transition-colors">
            READ MORE →
          </Link>
        </article>

        <article className="card-block p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-accent border border-accent-dark"></div>
            <h3 className="font-pixel text-[0.65rem] text-accent">LATEST IDEAS</h3>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-body">
            A rolling list of community-suggested projects, mini builds, and creative challenges.
          </p>
          <Link href="/ideas" className="inline-block mt-4 font-pixel text-[0.5rem] text-accent hover:text-primary transition-colors">
            VIEW ALL →
          </Link>
        </article>

        <article className="card-block p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 bg-cream border border-cream-dark"></div>
            <h3 className="font-pixel text-[0.65rem] text-dirt">ABOUT US</h3>
          </div>
          <p className="text-sm text-[var(--color-muted)] font-body">
            We create original voxel art and publish guides inspired by block aesthetics.
          </p>
          <Link href="/about" className="inline-block mt-4 font-pixel text-[0.5rem] text-accent hover:text-primary transition-colors">
            LEARN MORE →
          </Link>
        </article>
      </section>

      {/* Decorative pixel divider */}
      <div className="flex justify-center gap-1 mt-16 mb-8">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="w-4 h-4 transition-transform hover:scale-110"
            style={{
              backgroundColor: ['#2E8B57', '#E5D3B3', '#8B5A2B', '#808080', '#FF7A18'][i % 5],
              boxShadow: '2px 2px 0 rgba(0,0,0,0.15)'
            }}
          />
        ))}
      </div>
    </Layout>
  )
}

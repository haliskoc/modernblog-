import Link from 'next/link'
import Layout from '../../components/Layout'
import { getSortedPostsData } from '../../lib/posts'

export default function Posts({ allPostsData }){
  return (
    <Layout>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-6 bg-primary border-2 border-primary-dark" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}></div>
        <h1 className="font-pixel text-lg text-primary">POSTS</h1>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {allPostsData.map((post, index) => (
          <article key={post.slug} className="card-block p-6 group">
            {/* Post thumbnail placeholder */}
            <div 
              className="h-32 mb-4 border-2 border-[var(--color-border)] flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${index % 2 === 0 ? '#2E8B57' : '#8B5A2B'} 0%, ${index % 2 === 0 ? '#7CB342' : '#A0522D'} 100%)`,
                boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.2)'
              }}
            >
              <div className="grid grid-cols-3 gap-1 opacity-30">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-white/30 border border-white/20"></div>
                ))}
              </div>
            </div>

            {/* Post meta */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-pixel text-[0.45rem] text-[var(--color-muted)]">{post.date}</span>
              <span className="w-1 h-1 bg-[var(--color-muted)]"></span>
              <span className="font-pixel text-[0.45rem] text-[var(--color-muted)]">{post.author}</span>
            </div>

            {/* Post title */}
            <h3 className="font-pixel text-[0.7rem] text-[var(--color-text)] group-hover:text-primary transition-colors mb-2">
              <Link href={`/posts/${post.slug}`}>
                {post.title.toUpperCase()}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[var(--color-muted)] font-body line-clamp-2">
              {post.excerpt}
            </p>

            {/* Read more */}
            <Link 
              href={`/posts/${post.slug}`} 
              className="inline-block mt-4 font-pixel text-[0.5rem] text-accent hover:text-primary transition-colors"
            >
              READ MORE →
            </Link>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {allPostsData.length === 0 && (
        <div className="card-block p-12 text-center">
          <div className="w-16 h-16 bg-stone border-2 border-gray-600 mx-auto mb-4" style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}></div>
          <p className="font-pixel text-[0.6rem] text-[var(--color-muted)]">NO POSTS YET</p>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  return {
    props: { allPostsData }
  }
}

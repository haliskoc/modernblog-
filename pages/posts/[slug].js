import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPostSlugs, getPostData } from '../../lib/posts'

export default function Post({ postData }){
  if(!postData) return <Layout><p>Not found</p></Layout>

  return (
    <Layout>
      {/* Back link */}
      <Link href="/posts" className="inline-flex items-center gap-2 font-pixel text-[0.5rem] text-primary hover:text-accent transition-colors mb-6">
        ← BACK TO POSTS
      </Link>

      <article className="max-w-2xl">
        {/* Post header */}
        <header className="mb-8">
          <h1 className="font-pixel text-lg md:text-xl text-primary leading-relaxed">
            {postData.title.toUpperCase()}
          </h1>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 bg-primary border-2 border-primary-dark flex items-center justify-center">
              <span className="font-pixel text-white text-[0.4rem]">
                {postData.author?.split(' ').map(n => n[0]).join('') || 'VA'}
              </span>
            </div>
            <div>
              <div className="font-pixel text-[0.5rem] text-[var(--color-text)]">{postData.author}</div>
              <div className="font-pixel text-[0.45rem] text-[var(--color-muted)]">{postData.date}</div>
            </div>
          </div>
        </header>

        {/* Hero image placeholder */}
        <div 
          className="h-48 md:h-64 mb-8 border-4 border-[var(--color-border)] flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, #2E8B57 0%, #7CB342 50%, #8B5A2B 100%)',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.2)'
          }}
        >
          <div className="grid grid-cols-5 gap-1 opacity-40">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-white/30 border border-white/20"></div>
            ))}
          </div>
        </div>

        {/* Post content */}
        <div 
          className="prose max-w-none" 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

        {/* Post footer */}
        <footer className="mt-12 pt-8 border-t-4 border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div className="font-pixel text-[0.5rem] text-[var(--color-muted)]">
              THANKS FOR READING!
            </div>
            <Link href="/posts" className="btn-secondary text-[0.5rem]">
              More Posts
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs()
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  
  if (!postData) {
    return {
      notFound: true
    }
  }

  return {
    props: { postData },
    revalidate: 3600 // Revalidate every hour
  }
}

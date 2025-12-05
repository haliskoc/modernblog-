import Layout from '../components/Layout'

export default function About(){
  return (
    <Layout>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-6 bg-cream border-2 border-cream-dark" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}></div>
        <h1 className="font-pixel text-lg text-primary">ABOUT THIS BLOG</h1>
      </div>

      {/* Main content card */}
      <div className="card-block p-8 max-w-2xl">
        <p className="text-[var(--color-text)] font-body leading-relaxed">
          Bu blog, Minecraft estetiğinden ilham alan orijinal voxel sanatları ve derinlemesine rehberleri paylaşıyor. 
          Erişilebilirlik ve performans önceliğimizdir.
        </p>
        
        <p className="text-[var(--color-muted)] font-body mt-4 leading-relaxed">
          This blog shares voxel-inspired tutorials, build showcases and ideas. All visuals are original voxel art 
          or open-license assets. We focus on accessibility, performance, and clear writing.
        </p>

        {/* Decorative blocks */}
        <div className="flex gap-2 mt-8">
          <div className="w-8 h-8 bg-grass border-2 border-primary-dark"></div>
          <div className="w-8 h-8 bg-dirt border-2 border-stone"></div>
          <div className="w-8 h-8 bg-stone border-2 border-gray-600"></div>
          <div className="w-8 h-8 bg-primary border-2 border-primary-dark"></div>
        </div>
      </div>

      {/* Contribute section */}
      <div className="card-block p-6 mt-8 max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-accent border border-accent-dark"></div>
          <h2 className="font-pixel text-[0.7rem] text-accent">CONTRIBUTE</h2>
        </div>
        <p className="text-sm text-[var(--color-muted)] font-body">
          Have an idea for a build or tutorial? We'd love to hear it! Submit your suggestions on our Ideas page.
        </p>
        <a href="/ideas" className="inline-block mt-4 btn-minecraft">
          Submit Idea
        </a>
      </div>

      {/* Team / Author placeholder */}
      <div className="mt-12">
        <h2 className="font-pixel text-sm text-primary mb-6">THE BUILDERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-block p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary border-2 border-primary-dark flex items-center justify-center">
              <span className="font-pixel text-white text-[0.5rem]">VA</span>
            </div>
            <div>
              <div className="font-pixel text-[0.6rem] text-[var(--color-text)]">VOXEL AUTHOR</div>
              <div className="text-xs text-[var(--color-muted)]">Lead Builder & Writer</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function Footer(){
  return (
    <footer className="bg-[var(--color-surface)] border-t-4 border-[var(--color-border)] mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Pixel decoration line */}
        <div className="flex gap-1 mb-6 justify-center">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-3 h-3" 
              style={{ 
                backgroundColor: i % 3 === 0 ? '#2E8B57' : i % 3 === 1 ? '#8B5A2B' : '#808080'
              }}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-pixel text-[0.5rem] text-[var(--color-muted)]">
            © {new Date().getFullYear()} VOXEL BLOG. BUILT WITH BLOCKS.
          </div>
          <div className="flex gap-4">
            <a href="/rss.xml" className="font-pixel text-[0.5rem] text-primary hover:text-accent transition-colors">
              RSS
            </a>
            <a href="/privacy" className="font-pixel text-[0.5rem] text-primary hover:text-accent transition-colors">
              PRIVACY
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import Layout from '../components/Layout'

const ideas = [
  { id: 1, title: 'Modular Redstone Bridge', status: 'accepted', votes: 24 },
  { id: 2, title: 'Underground Villager Market', status: 'idea', votes: 18 },
  { id: 3, title: 'Floating Island Base', status: 'draft', votes: 12 },
  { id: 4, title: 'Nether Highway System', status: 'idea', votes: 31 },
]

const statusColors = {
  idea: { bg: 'bg-accent', border: 'border-accent-dark', text: 'IDEA' },
  draft: { bg: 'bg-cream', border: 'border-cream-dark', text: 'DRAFT' },
  accepted: { bg: 'bg-primary', border: 'border-primary-dark', text: 'ACCEPTED' },
}

export default function Ideas(){
  return (
    <Layout>
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-6 bg-accent border-2 border-accent-dark" style={{ boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}></div>
        <h1 className="font-pixel text-lg text-accent">IDEAS</h1>
      </div>

      <p className="text-[var(--color-muted)] font-body mb-8 max-w-xl">
        Short ideas and community suggestions. Vote for your favorites and help shape future content!
      </p>

      {/* Ideas List */}
      <div className="space-y-4 max-w-2xl">
        {ideas.map(idea => {
          const status = statusColors[idea.status]
          return (
            <div key={idea.id} className="card-block p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Vote block */}
                <div className="flex flex-col items-center">
                  <button className="w-8 h-6 bg-[var(--color-surface)] border-2 border-[var(--color-border)] hover:bg-primary hover:text-white hover:border-primary-dark transition-colors font-pixel text-[0.4rem]">
                    ▲
                  </button>
                  <span className="font-pixel text-[0.6rem] text-primary my-1">{idea.votes}</span>
                  <button className="w-8 h-6 bg-[var(--color-surface)] border-2 border-[var(--color-border)] hover:bg-stone hover:text-white transition-colors font-pixel text-[0.4rem]">
                    ▼
                  </button>
                </div>

                {/* Idea content */}
                <div>
                  <h3 className="font-pixel text-[0.6rem] text-[var(--color-text)]">{idea.title.toUpperCase()}</h3>
                  <span className={`inline-block mt-2 ${status.bg} ${status.border} border-2 px-2 py-0.5 font-pixel text-[0.4rem] text-white`}>
                    {status.text}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit new idea */}
      <div className="card-block p-6 mt-8 max-w-md">
        <h2 className="font-pixel text-[0.7rem] text-primary mb-4">SUBMIT YOUR IDEA</h2>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Your idea title..."
            className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none"
            style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.1)' }}
          />
          <textarea 
            placeholder="Describe your idea..."
            rows={3}
            className="w-full p-3 border-3 border-[var(--color-border)] bg-[var(--color-surface)] font-body text-sm focus:border-primary focus:outline-none resize-none"
            style={{ boxShadow: 'inset 2px 2px 0 rgba(0,0,0,0.1)' }}
          />
          <button type="submit" className="btn-minecraft">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

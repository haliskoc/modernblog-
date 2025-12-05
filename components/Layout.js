import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, title = 'Voxel Blog', description = 'A Minecraft-inspired blog with voxel aesthetics' }){
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)] transition-colors">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </>
  )
}

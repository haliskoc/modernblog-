import { getSortedPostsData } from '../lib/posts'

function buildRss(items){
  const siteUrl = 'http://localhost:3000'
  const rssItems = items.map(i => `
    <item>
      <title><![CDATA[${i.title}]]></title>
      <link>${siteUrl}/posts/${i.slug}</link>
      <guid>${siteUrl}/posts/${i.slug}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <description><![CDATA[${i.excerpt || ''}]]></description>
    </item>
  `).join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Voxel Blog</title>
      <link>${siteUrl}</link>
      <description>Voxel-inspired blog feed</description>
      ${rssItems}
    </channel>
  </rss>`
}

export async function getServerSideProps({ res }){
  const posts = getSortedPostsData()
  const rss = buildRss(posts)

  res.setHeader('Content-Type', 'application/rss+xml')
  res.write(rss)
  res.end()

  return { props: {} }
}

export default function Rss() {
  return null
}

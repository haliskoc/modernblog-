import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@supabase/supabase-js'

// Load env variables
const envContent = fs.readFileSync('.env.local', 'utf-8')
const envLines = envContent.split('\n')
const env = {}
envLines.forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) env[key.trim()] = value.trim()
})

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migratePostsToSupabase() {
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  const files = fs.readdirSync(postsDir)

  for (const file of files) {
    if (!file.endsWith('.md')) continue

    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const slug = path.basename(file, '.md')

    console.log(`Migrating: ${slug}`)

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            slug,
            title: data.title || slug,
            description: data.excerpt || data.description || '',
            category: data.category || 'Tutorial',
            image_url: data.image || '',
            content
          }
        ])

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          console.log(`  → Already exists, skipping`)
        } else {
          console.error(`  → Error: ${error.message}`)
        }
      } else {
        console.log(`  ✓ Migrated successfully`)
      }
    } catch (err) {
      console.error(`  ✗ Exception: ${err.message}`)
    }
  }

  console.log('\n✅ Migration completed!')
}

migratePostsToSupabase()

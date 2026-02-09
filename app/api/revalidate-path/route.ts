import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Tags must match exactly what sanityFetch uses in components
const TAG_MAP: Record<string, string[]> = {
  Post:     ['Post'],       // blog posts
  blogPost: ['Post'],       // backwards compatibility
  project:  ['project'],    // project pages (lowercase to match sanityFetch tags)
  author:   ['Post'],       // author data is embedded in Post queries
  profile:  ['profile'],    // home page + about page
  job:      ['job'],        // home page (work experience)
  heroe:    ['heroe'],      // about page (heroes section)
}

// Static paths to revalidate per content type
const PATH_MAP: Record<string, string[]> = {
  profile: ['/', '/about'],
  job:     ['/'],
  heroe:   ['/about'],
  author:  ['/'],
}

export async function POST(req: NextRequest) {
  try {
    // Read raw body first for signature verification
    const rawBody = await req.text()
    
    const secret = process.env.SANITY_HOOK_SECRET
    if (secret) {
      const signature = req.headers.get(SIGNATURE_HEADER_NAME)
      if (!signature) {
        console.log('[revalidate-path] No signature header, header name:', SIGNATURE_HEADER_NAME)
        console.log('[revalidate-path] Available headers:', Object.fromEntries(req.headers.entries()))
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
      }
      
      const isValid = await isValidSignature(rawBody, signature, secret)
      if (!isValid) {
        console.log('[revalidate-path] Invalid signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)

    if (!body?._type) {
      return NextResponse.json({ error: 'Missing _type' }, { status: 400 })
    }

    const type = body._type
    const tags = TAG_MAP[type] || []
    const revalidatedTags: string[] = []
    const revalidatedPaths: string[] = []

    // Revalidate all cache tags for this content type
    for (const tag of tags) {
      revalidateTag(tag, 'default')
      revalidatedTags.push(tag)
      console.log(`[revalidate-path] Revalidated tag: ${tag}`)
    }

    // Determine paths to revalidate
    const paths: string[] = []

    // Check if this type has static path mappings
    if (PATH_MAP[type]) {
      paths.push(...PATH_MAP[type])
    }

    // Handle slug-based dynamic paths
    // Webhook projection sends "slug": slug.current (a plain string)
    const slug = body.slug
    if (type === 'Post' && slug) {
      paths.push(`/blog/${slug}`)
      paths.push('/blog') // also revalidate the blog listing page
    } else if (type === 'project' && slug) {
      paths.push(`/projects/${slug}`)
      paths.push('/projects') // also revalidate the projects listing page
    }

    // Revalidate all paths
    for (const p of paths) {
      revalidatePath(p, 'page')
      revalidatedPaths.push(p)
      console.log(`[revalidate-path] Revalidated path: ${p}`)
    }

    console.log(`[revalidate-path] Success! Type: ${type}, Tags: [${revalidatedTags.join(', ')}], Paths: [${revalidatedPaths.join(', ')}]`)

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      type: type,
      tags: revalidatedTags,
    })
  } catch (error) {
    console.error('[revalidate-path] Error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

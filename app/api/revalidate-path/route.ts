import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const TAG_MAP: Record<string, string> = {
  Post: 'Post',        // Sanity _type is "Post", not "blogPost"
  blogPost: 'Post',    // Keep for backwards compatibility
  project: 'Project',
  author: 'Author',
  page: 'Page',
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
    const tag = TAG_MAP[type]

    if (tag) {
      revalidateTag(tag, 'default')
      console.log(`[revalidate-path] Revalidated tag: ${tag}`)
    }

    let path = body?.path || '/'

    if (!path || path === '/') {
      if (type === 'Post' && body.slug?.current) {
        path = `/blog/${body.slug.current}`
      } else if (type === 'project' && body.slug?.current) {
        path = `/projects/${body.slug.current}`
      } else if (type === 'author') {
        path = '/'
      }
    }

    if (path && path !== '/') {
      revalidatePath(path, 'page')
      console.log(`[revalidate-path] Revalidated path: ${path}`)
    }

    console.log(`[revalidate-path] Success! Type: ${type}, Path: ${path}, Tag: ${tag}`)

    return NextResponse.json({
      revalidated: true,
      path: path,
      type: type,
      tag: tag
    })
  } catch (error) {
    console.error('[revalidate-path] Error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

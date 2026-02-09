import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

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
      const signature = req.headers.get('x-sanity-signature')
      if (!signature) {
        console.log('[revalidate-path] No signature header')
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
      }
      
      const hmac = crypto.createHmac('sha256', secret)
      hmac.update(rawBody, 'utf8')
      const expectedSignature = `sha256=${hmac.digest('hex')}`
      
      if (signature !== expectedSignature) {
        console.log('[revalidate-path] Signature mismatch')
        console.log('Expected:', expectedSignature)
        console.log('Got:', signature)
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
      if (type === 'blogPost' && body.slug?.current) {
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

    console.log(`[revalidate-path] Type: ${type}, Full body:`, body)

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
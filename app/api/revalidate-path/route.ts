import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifySignature(req: NextRequest, body: string): boolean {
  const secret = process.env.SANITY_HOOK_SECRET
  if (!secret) {
    console.log('[revalidate-path] No SANITY_HOOK_SECRET configured, skipping signature verification')
    return true
  }

  const signature = req.headers.get('x-sanity-signature')
  if (!signature) {
    console.log('[revalidate-path] No x-sanity-signature header found')
    return false
  }

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body, 'utf8')
  const expectedSignature = `sha256=${hmac.digest('hex')}`

  if (signature !== expectedSignature) {
    console.log('[revalidate-path] Signature mismatch')
    console.log('Expected:', expectedSignature)
    console.log('Got:', signature)
    return false
  }

  return true
}

const TAG_MAP: Record<string, string> = {
  blogPost: 'Post',
  project: 'Project',
  author: 'Author',
  page: 'Page',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const bodyString = JSON.stringify(body)

    const secret = process.env.SANITY_HOOK_SECRET
    if (secret && !verifySignature(req, bodyString)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ error: 'Missing _type' }, { status: 400 })
    }

    const type = body._type
    const tag = TAG_MAP[type]

    if (tag) {
      revalidateTag(tag, 'page')
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
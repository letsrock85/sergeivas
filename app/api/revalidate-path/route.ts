import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  const { isValidSignature, body } = await parseBody<{
    _type: string
    slug?: { current: string }
    path?: string
  }>(req, secret)

  // Skip signature check if no secret configured (for development)
  if (secret && !isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  if (!body?._type) {
    return new Response('Bad Request', { status: 400 })
  }

  // Use path from projection if available, otherwise generate
  let path = body?.path || '/'

  if (!path || path === '/') {
    if (body._type === 'blogPost' && body.slug?.current) {
      path = `/blog/${body.slug.current}`
    } else if (body._type === 'project' && body.slug?.current) {
      path = `/projects/${body.slug.current}`
    } else if (body._type === 'author') {
      path = '/'
    }
  }

  revalidatePath(path)

  console.log(`[revalidate-path] Revalidated: ${path} (type: ${body._type})`)

  return NextResponse.json({
    revalidated: true,
    path: path,
    type: body._type
  })
}
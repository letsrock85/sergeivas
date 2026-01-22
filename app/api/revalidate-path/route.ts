import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{
    _type: string
    slug?: { current: string }
  }>(req, process.env.SANITY_REVALIDATE_SECRET)

  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  if (!body?._type) {
    return new Response('Bad Request', { status: 400 })
  }

  // Dynamic path generation based on document type and slug
  let path = '/'
  
  if (body._type === 'blogPost' && body.slug?.current) {
    path = `/blog/${body.slug.current}`
  } else if (body._type === 'project' && body.slug?.current) {
    path = `/projects/${body.slug.current}`
  } else if (body._type === 'author') {
    path = '/' // Update homepage with author list
  }

  revalidatePath(path)
  
  return NextResponse.json({ 
    revalidated: true, 
    path: path,
    type: body._type 
  })
}
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!body?._type) {
      return NextResponse.json({ error: 'Missing _type' }, { status: 400 })
    }

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
  } catch (error) {
    console.error('[revalidate-path] Error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
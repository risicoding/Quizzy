import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

export const app = new Hono().basePath('/api').get('/',(c)=>c.json({success:true}))

app.on(['GET','POST'],'/api/auth/**',(c)=>auth.handler(c.req.raw))

export const GET = handle(app)
export const POST = handle(app)

import { json } from '@tanstack/start'
import type { APIEvent } from '@tanstack/start'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.CONVEX_URL!)

// GET /api/problems/:id - Get single problem
export async function GET({ params }: APIEvent) {
  try {
    const { id } = params

    const problem = await convex.query(api.problems.getById, { id })

    if (!problem) {
      return json({ error: 'Problem not found' }, { status: 404 })
    }

    return json({ success: true, data: problem })
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 })
  }
}
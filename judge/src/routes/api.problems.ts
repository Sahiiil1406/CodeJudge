// ============================================
// FILE: app/routes/api.problems.ts
// ============================================
import { json } from '@tanstack/start'
import type { APIEvent } from '@tanstack/start'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.CONVEX_URL!)

// Helper to get user from token
async function getUserFromRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie')
  const token = cookieHeader
    ?.split('; ')
    .find((row) => row.startsWith('auth_token='))
    ?.split('=')[1]

  if (!token) {
    throw new Error('Not authenticated')
  }

  // Verify token and get userId (simplified)
  return token // In production, verify JWT and extract userId
}

// GET /api/problems - List problems with pagination and filters
export async function GET({ request }: APIEvent) {
  try {
    const url = new URL(request.url)
    
    // Extract query parameters
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const difficulty = url.searchParams.get('difficulty') || undefined
    const status = url.searchParams.get('status') || undefined
    const search = url.searchParams.get('search') || undefined
    const sortBy = url.searchParams.get('sortBy') || 'createdAt'
    const sortOrder = url.searchParams.get('sortOrder') || 'desc'
    const tags = url.searchParams.get('tags')?.split(',').filter(Boolean) || undefined

    // Get problems from Convex
    const result = await convex.query(api.problems.list, {
      page,
      limit,
      difficulty: difficulty as any,
      status: status as any,
      search,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
      tags,
    })

    return json({
      success: true,
      data: result.problems,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
        hasNext: result.hasNext,
        hasPrev: result.hasPrev,
      },
    })
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 })
  }
}

// POST /api/problems - Create a new problem
export async function POST({ request }: APIEvent) {
  try {
    await getUserFromRequest(request)
    
    const body = await request.json()
    const { title, description, difficulty, tags, examples, constraints } = body

    if (!title || !description || !difficulty) {
      return json(
        { error: 'Title, description, and difficulty are required' },
        { status: 400 }
      )
    }

    const problemId = await convex.mutation(api.problems.create, {
      title,
      description,
      difficulty,
      tags: tags || [],
      examples: examples || [],
      constraints: constraints || [],
    })

    return json({ success: true, id: problemId }, { status: 201 })
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/problems - Update a problem
export async function PUT({ request }: APIEvent) {
  try {
    await getUserFromRequest(request)
    
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return json({ error: 'Problem ID is required' }, { status: 400 })
    }

    await convex.mutation(api.problems.update, {
      id,
      ...updates,
    })

    return json({ success: true, message: 'Problem updated' })
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/problems - Delete a problem
export async function DELETE({ request }: APIEvent) {
  try {
    await getUserFromRequest(request)
    
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return json({ error: 'Problem ID is required' }, { status: 400 })
    }

    await convex.mutation(api.problems.remove, { id })

    return json({ success: true, message: 'Problem deleted' })
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 })
  }
}

// ============================================
// FILE: app/routes/api.auth.ts
// ============================================
import { json } from '@tanstack/start'
import type { APIEvent } from '@tanstack/start'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../convex/_generated/api'
import { SignJWT, jwtVerify } from 'jose'

const convex = new ConvexHttpClient(process.env.CONVEX_URL!)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

// Helper to create JWT token
async function createToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

// Helper to verify JWT token
async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

// POST /api/auth/register
export async function POST({ request }: APIEvent) {
  const url = new URL(request.url)
  const pathname = url.pathname

  try {
    if (pathname === '/api/auth/register') {
      const { email, password, name } = await request.json()

      if (!email || !password) {
        return json({ error: 'Email and password are required' }, { status: 400 })
      }

      // Create user in Convex
      const userId = await convex.mutation(api.auth.register, {
        email,
        password,
        name,
      })

      // Create JWT token
      const token = await createToken(userId)

      return json(
        {
          success: true,
          token,
          user: { id: userId, email, name },
        },
        {
          headers: {
            'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Path=/`,
          },
        }
      )
    }

    if (pathname === '/api/auth/login') {
      const { email, password } = await request.json()

      if (!email || !password) {
        return json({ error: 'Email and password are required' }, { status: 400 })
      }

      // Verify credentials with Convex
      const user = await convex.mutation(api.auth.login, {
        email,
        password,
      })

      if (!user) {
        return json({ error: 'Invalid credentials' }, { status: 401 })
      }

      // Create JWT token
      const token = await createToken(user._id)

      return json(
        {
          success: true,
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        },
        {
          headers: {
            'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; Path=/`,
          },
        }
      )
    }

    if (pathname === '/api/auth/logout') {
      return json(
        { success: true },
        {
          headers: {
            'Set-Cookie': 'auth_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
          },
        }
      )
    }

    return json({ error: 'Route not found' }, { status: 404 })
  } catch (error: any) {
    return json({ error: error.message || 'Authentication failed' }, { status: 500 })
  }
}

// GET /api/auth/me
export async function GET({ request }: APIEvent) {
  try {
    // Get token from cookie
    const cookieHeader = request.headers.get('cookie')
    const token = cookieHeader
      ?.split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1]

    if (!token) {
      return json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify token
    const payload = await verifyToken(token)
    if (!payload || !payload.userId) {
      return json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get user from Convex
    const user = await convex.query(api.auth.getUser, {
      userId: payload.userId as string,
    })

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 })
    }

    return json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error: any) {
    return json({ error: error.message || 'Failed to get user' }, { status: 500 })
  }
}
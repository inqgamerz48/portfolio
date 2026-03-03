import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createToken } from '@/lib/auth'

const DEMO_USERNAME = 'INQ'
const DEMO_PASSWORD = 'fuckingrich@2026'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      )
    }

    if (username.toUpperCase() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      const token = await createToken({ username: DEMO_USERNAME })

      const cookieStore = await cookies()
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      return NextResponse.json({ success: true, username: DEMO_USERNAME })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

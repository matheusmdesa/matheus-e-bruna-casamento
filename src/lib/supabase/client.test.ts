import { describe, it, expect, beforeAll } from 'vitest'
import { createClient } from './client'

describe('createClient (browser)', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
  })

  it('creates a Supabase client without throwing', () => {
    expect(() => createClient()).not.toThrow()
  })

  it('returns a client with an auth property', () => {
    const client = createClient()
    expect(client.auth).toBeDefined()
  })
})

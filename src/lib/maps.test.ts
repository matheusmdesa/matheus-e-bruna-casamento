import { describe, it, expect } from 'vitest'
import { buildGoogleMapsUrl } from './maps'

describe('buildGoogleMapsUrl', () => {
  it('encodes the address into a Google Maps search URL', () => {
    expect(buildGoogleMapsUrl('Espaco Ficticio, Rua A, 123')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Espaco%20Ficticio%2C%20Rua%20A%2C%20123'
    )
  })
})

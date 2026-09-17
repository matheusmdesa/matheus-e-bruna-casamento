import { describe, it, expect } from 'vitest'
import { getCountdownParts } from './countdown'

describe('getCountdownParts', () => {
  it('computes days, hours, minutes and seconds remaining', () => {
    const now = new Date('2026-01-01T00:00:00Z')
    const target = new Date('2026-01-03T02:03:04Z')
    expect(getCountdownParts(target, now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 3,
      seconds: 4,
    })
  })

  it('never returns negative values once the target has passed', () => {
    const now = new Date('2026-01-05T00:00:00Z')
    const target = new Date('2026-01-01T00:00:00Z')
    expect(getCountdownParts(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })
})

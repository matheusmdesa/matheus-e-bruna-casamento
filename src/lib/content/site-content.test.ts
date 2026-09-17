import { describe, it, expect } from 'vitest'
import { coupleNames, essencePhotos, timelineMilestones, eventSchedule, eventInfo } from './site-content'

describe('site-content', () => {
  it('puts Bruna before Matheus in the display name', () => {
    expect(coupleNames.display).toBe('Bruna & Matheus')
  })

  it('has exactly three essence photos', () => {
    expect(essencePhotos).toHaveLength(3)
  })

  it('has at least one timeline milestone', () => {
    expect(timelineMilestones.length).toBeGreaterThan(0)
  })

  it('has both ceremony and reception in the event schedule, in that order', () => {
    const titles = eventSchedule.map((item) => item.title)
    expect(titles).toEqual(['Cerimônia', 'Recepção'])
  })

  it('has an event date that is in the future', () => {
    expect(new Date(eventInfo.dateISO).getTime()).toBeGreaterThan(Date.now())
  })
})

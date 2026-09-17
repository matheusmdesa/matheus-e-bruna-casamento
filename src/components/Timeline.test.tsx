import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'
import { timelineMilestones } from '@/lib/content/site-content'

describe('Timeline', () => {
  it('renders every milestone title', () => {
    render(<Timeline />)
    timelineMilestones.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument()
    })
  })
})

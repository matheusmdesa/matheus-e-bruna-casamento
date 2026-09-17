import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Countdown } from './Countdown'

describe('Countdown', () => {
  it('renders all four unit labels', () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString()
    render(<Countdown targetDateISO={future} />)
    expect(screen.getByText('Dias')).toBeInTheDocument()
    expect(screen.getByText('Horas')).toBeInTheDocument()
    expect(screen.getByText('Min')).toBeInTheDocument()
    expect(screen.getByText('Seg')).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Medallion } from './Medallion'

describe('Medallion', () => {
  it('renders the couple initials by default', () => {
    render(<Medallion />)
    expect(screen.getByText('B · M')).toBeInTheDocument()
  })

  it('accepts custom initials', () => {
    render(<Medallion initials="X · Y" />)
    expect(screen.getByText('X · Y')).toBeInTheDocument()
  })
})

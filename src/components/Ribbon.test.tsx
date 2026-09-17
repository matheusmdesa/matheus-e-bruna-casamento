import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Ribbon } from './Ribbon'

describe('Ribbon', () => {
  it('renders its content', () => {
    render(<Ribbon>04 · 04 · 2026</Ribbon>)
    expect(screen.getByText('04 · 04 · 2026')).toBeInTheDocument()
  })
})

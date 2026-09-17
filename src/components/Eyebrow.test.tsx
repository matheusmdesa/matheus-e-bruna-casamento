import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Eyebrow } from './Eyebrow'

describe('Eyebrow', () => {
  it('renders its label text', () => {
    render(<Eyebrow>Vamos nos casar</Eyebrow>)
    expect(screen.getByText('Vamos nos casar')).toBeInTheDocument()
  })

  it('uses the light tone class when tone="light"', () => {
    render(<Eyebrow tone="light">Bem-vindos</Eyebrow>)
    expect(screen.getByText('Bem-vindos')).toHaveClass('text-white/40')
  })

  it('uses the dark tone class by default', () => {
    render(<Eyebrow>Onde e quando</Eyebrow>)
    expect(screen.getByText('Onde e quando')).toHaveClass('text-cinza-medio')
  })
})

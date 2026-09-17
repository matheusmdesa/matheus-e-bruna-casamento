import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from './Nav'

describe('Nav', () => {
  it('renders links to all four pages', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'História' })).toHaveAttribute(
      'href',
      '/historia'
    )
    expect(screen.getByRole('link', { name: 'Evento' })).toHaveAttribute(
      'href',
      '/evento'
    )
    expect(screen.getByRole('link', { name: 'RSVP' })).toHaveAttribute('href', '/rsvp')
  })
})

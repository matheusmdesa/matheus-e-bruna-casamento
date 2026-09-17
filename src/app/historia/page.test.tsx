import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HistoriaPage from './page'

describe('História page', () => {
  it('renders the page title and at least one milestone', () => {
    render(<HistoriaPage />)
    expect(screen.getByText('Nossa história')).toBeInTheDocument()
    expect(screen.getByText('Como nos conhecemos')).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home page', () => {
  it('renders the couple name, essence photos and countdown labels', () => {
    render(<Home />)
    expect(screen.getAllByText('Bruna & Matheus').length).toBeGreaterThan(0)
    expect(screen.getByAltText('Alianças de casamento')).toBeInTheDocument()
    expect(screen.getByText('Dias')).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EssenceRow } from './EssenceRow'

describe('EssenceRow', () => {
  it('renders all three essence photos with their captions', () => {
    render(<EssenceRow />)
    expect(screen.getByAltText('Gravata borboleta')).toBeInTheDocument()
    expect(screen.getByAltText('Alianças de casamento')).toBeInTheDocument()
    expect(screen.getByAltText('Buquê de tulipas')).toBeInTheDocument()
    expect(screen.getByText('Ele')).toBeInTheDocument()
    expect(screen.getByText('Nós')).toBeInTheDocument()
    expect(screen.getByText('Ela')).toBeInTheDocument()
  })
})

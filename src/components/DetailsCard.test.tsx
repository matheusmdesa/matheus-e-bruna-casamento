import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DetailsCard } from './DetailsCard'

describe('DetailsCard', () => {
  it('renders the seal initials and children content', () => {
    render(
      <DetailsCard seal="B · M">
        <p>Cerimônia às 16h</p>
      </DetailsCard>
    )
    expect(screen.getByText('B · M')).toBeInTheDocument()
    expect(screen.getByText('Cerimônia às 16h')).toBeInTheDocument()
  })

  it('defaults the seal to the couple initials', () => {
    render(
      <DetailsCard>
        <p>Conteúdo</p>
      </DetailsCard>
    )
    expect(screen.getByText('B · M')).toBeInTheDocument()
  })
})

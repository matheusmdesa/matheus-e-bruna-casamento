import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { LocationIcon, ReceptionIcon } from './LineIcons'

describe('LineIcons', () => {
  it('renders the location icon as an svg', () => {
    const { container } = render(<LocationIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders the reception icon as an svg', () => {
    const { container } = render(<ReceptionIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })
})

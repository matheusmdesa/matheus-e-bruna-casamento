import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EventoPage from './page'
import { eventInfo } from '@/lib/content/site-content'
import { buildGoogleMapsUrl } from '@/lib/maps'

describe('Evento page', () => {
  it('renders the schedule and a working map link', () => {
    render(<EventoPage />)
    expect(screen.getByText('Cerimônia')).toBeInTheDocument()
    expect(screen.getByText('Recepção')).toBeInTheDocument()
    const mapLink = screen.getByRole('link', { name: 'Ver no mapa' })
    expect(mapLink).toHaveAttribute('href', buildGoogleMapsUrl(eventInfo.addressForMaps))
  })
})

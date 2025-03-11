import type { LngLat } from 'maplibre-gl'

export const clickedMarker = $state<{ point: LngLat | null }>({ point: null })

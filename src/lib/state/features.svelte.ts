import { getLocalMasts, type MastCollection } from '$lib/api/masts'
import type { LngLat } from 'maplibre-gl'

export let features = $state<{ points: MastCollection }>({
  points: { type: 'FeatureCollection', features: [] }
})

export const setPoints = async () => {
  const data = await getLocalMasts()
  features.points = data
}

export let hoveringPoint = $state<{ point: LngLat | null }>({ point: null })

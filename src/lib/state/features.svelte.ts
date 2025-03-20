import { getLocalMasts, type Mast, type MastCollection } from '$lib/api/masts'
import type { ExcelMast } from '$lib/types/data'

export const marker = $state<{ point: [number, number] | null }>({ point: null })

export let features = $state<{ points: MastCollection }>({
  points: { type: 'FeatureCollection', features: [] }
})

export const setPoints = async () => {
  const data = await getLocalMasts()
  features.points = data
}

export let hoveredMast = $state<{ mast: Mast | null }>({ mast: null })
export let closestPoints = $state<{ points: [Mast, number][] }>({ points: [] })

export let excelFeatures = $state<{ data: ExcelMast[] }>({
  data: []
})

export let excelHoveredMast = $state<{ mast: ExcelMast | null }>({ mast: null })
export let excelClosestPoints = $state<{ points: [ExcelMast, number][] }>({ points: [] })

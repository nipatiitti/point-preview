import { START_CENTER, START_ZOOM } from '$lib/utils/constants'
import { genRandomData } from '$lib/utils/randomData'
import type { LngLat } from 'maplibre-gl'

export let points = $state(genRandomData(START_ZOOM, START_CENTER, 500))

export let hoveringPoint = $state<{ point: LngLat | null }>({ point: null })

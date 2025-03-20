import type { Map } from 'maplibre-gl'

export let map = $state<{ instance: Map | undefined }>({
  instance: undefined
})

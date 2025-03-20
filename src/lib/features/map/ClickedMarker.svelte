<script lang="ts">
  import { marker } from '$lib/state/features.svelte'
  import { Marker } from 'svelte-maplibre-gl'

  /**
   * Creates a debounced function that delays invoking the provided function
   * @param func The function to debounce
   * @param timeout The delay in milliseconds
   */
  function debounce<T extends (...args: any[]) => any>(func: T, timeout: number): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), timeout)
    }
  }

  const handleDrag = debounce((e: { target: { getLngLat: () => { lng: number; lat: number } } }) => {
    const { lng, lat } = e.target.getLngLat()
    marker.point = [lng, lat]
  }, 20)
</script>

{#if marker.point}
  <Marker lnglat={marker.point} draggable={true} ondrag={handleDrag} />
{/if}

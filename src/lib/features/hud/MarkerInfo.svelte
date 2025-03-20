<script lang="ts">
  import { marker } from '$lib/state/features.svelte'
  import Icon from '@iconify/svelte'
  import toast from 'svelte-french-toast'

  let coords = $derived(marker.point)
  let coordsText = $derived(coords?.map((c) => c.toFixed(6)).join(', ') ?? '')

  const copyCoords = async () => {
    try {
      await navigator.clipboard.writeText(coordsText)
      toast.success('Coordinates copied to clipboard')
    } catch (e) {
      console.error(e)
      toast.error('Failed to copy coordinates')
    }
  }

  let input = $state<HTMLInputElement>()

  const finnishBBOX = [
    [8.210371622418904, 58.911920440350315],
    [44.878985984105526, 70.49740176331076]
  ] // [lng, lat]

  const onChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    const coords = value.split(',').map((c) => parseFloat(c)) as [number, number]
    if (coords.length !== 2 || coords.some((c) => isNaN(c))) {
      toast.error('Invalid coordinates')
      return
    }

    // if the coordinates are outside of Finland, maybe the lng and lat are swapped
    if (
      coords[0] < finnishBBOX[0][0] ||
      coords[0] > finnishBBOX[1][0] ||
      coords[1] < finnishBBOX[0][1] ||
      coords[1] > finnishBBOX[1][1]
    ) {
      coords.reverse()
    }

    // If the coords are still outside of Finland, show an error
    if (
      coords[0] < finnishBBOX[0][0] ||
      coords[0] > finnishBBOX[1][0] ||
      coords[1] < finnishBBOX[0][1] ||
      coords[1] > finnishBBOX[1][1]
    ) {
      toast.error('Coordinates are outside of Finland')
      return
    }

    marker.point = coords
  }
</script>

{#if coords}
  <div class="bg-cyan-100 p-4 rounded shadow flex gap-2">
    <input
      type="text"
      value={coordsText}
      onchange={onChange}
      class="w-full bg-blue-50 p-2 rounded"
      bind:this={input}
      onclick={() => input?.select()}
    />
    <button
      class="bg-blue-200 p-2 rounded cursor-pointer flex items-center justify-center"
      onclick={copyCoords}
      title="Copy coordinates"
    >
      <Icon icon="lets-icons:copy-light" />
    </button>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${coords[1]},${coords[0]}`}
      target="_blank"
      rel="noopener"
      class="bg-blue-200 p-2 rounded cursor-pointer flex items-center justify-center"
      title="Open in Google Maps"
    >
      <Icon icon="lets-icons:external" />
    </a>
  </div>
{/if}

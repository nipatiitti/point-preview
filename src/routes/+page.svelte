<script lang="ts">
  import Hud from '$lib/features/hud/Hud.svelte'
  import BaseMap from '$lib/features/map/BaseMap.svelte'
  import ClickedMarker from '$lib/features/map/ClickedMarker.svelte'
  import HoverLine from '$lib/features/map/HoverLine.svelte'
  import Points from '$lib/features/map/Points.svelte'
</script>

<Hud />

<main class="map-container">
  <BaseMap>
    <Points />
    <HoverLine />
    <ClickedMarker />
  </BaseMap>
</main>

<style>
  .map-container {
    height: 100vh;
    width: 100vw;
  }
</style>

<script lang="ts">
  import Hud from '$lib/features/hud/Hud.svelte'
  import BaseMap from '$lib/features/map/BaseMap.svelte'
  import ClickedMarker from '$lib/features/map/ClickedMarker.svelte'
  import HoverLine from '$lib/features/map/DistanceLines.svelte'
  import ExcelPoints from '$lib/features/map/ExcelPoints.svelte'
  import Points from '$lib/features/map/Points.svelte'
</script>

<div class="h-[100vh] w-[100vw] flex md:flex-row flex-col">
  <main class="map-container flex-[1]">
    <BaseMap>
      <Points />
      <ExcelPoints />
      <HoverLine />
      <ClickedMarker />
    </BaseMap>
  </main>

  <Hud />
</div>

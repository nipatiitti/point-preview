<script>
  import Excel from './Excel.svelte'
  import MarkerInfo from './MarkerInfo.svelte'
  import Paikkatietoikkuna from './Paikkatietoikkuna.svelte'
</script>

<div
  class="hud md:absolute relative top-0 right-0 z-10 flex flex-col md:max-h-full max-h-[30vh] overflow-y-auto gap-4 p-4"
>
  <MarkerInfo />
  <Paikkatietoikkuna />
  <Excel />
</div>

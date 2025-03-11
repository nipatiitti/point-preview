<script lang="ts">
	import { PUBLIC_MAP_KEY } from '$env/static/public';
	import type { Map } from 'maplibre-gl';
	import type { Snippet } from 'svelte';
	import { MapLibre } from 'svelte-maplibre-gl';

	type Props = {
		children?: Snippet;
	};
	let { children } = $props() as Props;

	let baseUrl = 'https://avoin-karttakuva.maanmittauslaitos.fi';
	let style = `${baseUrl}/vectortiles/stylejson/v20/taustakartta.json?TileMatrixSet=WGS84_Pseudo-Mercator&api-key=${PUBLIC_MAP_KEY}`;

	let map = $state<Map>();
</script>

<MapLibre
	bind:map
	class="h-full w-full"
	{style}
	zoom={4.59}
	center={[26.544678803263537, 65.33426030226093]}
>
	{@render children?.()}
</MapLibre>

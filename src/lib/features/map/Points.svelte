<script lang="ts">
	import type { Point } from '$lib/types/data';
	import { CircleLayer, GeoJSONSource } from 'svelte-maplibre-gl';

	type Props = {
		points: Point[];
	};
	let { points }: Props = $props();
</script>

<GeoJSONSource
	id="points"
	data={{
		type: 'FeatureCollection',
		features: points.map(({ id, ...point }) => ({
			type: 'Feature',
			id,
			properties: point,
			geometry: { type: 'Point', coordinates: [point.lng, point.lat] }
		}))
	}}
>
	<CircleLayer
		id="points"
		paint={{
			'circle-radius': 5,
			'circle-color': '#007cbf'
		}}
	/>
</GeoJSONSource>

<script lang="ts">
  import localMastData from '$lib/data/masts_WGS84.json'
</script>

<!-- Display mast data -->
<table class="table-auto">
  <thead class="bg-gray-800 text-white">
    <tr class="text-left">
      <th class="px-4 py-2">mtk_id</th>
      <th class="px-4 py-2">Longitude</th>
      <th class="px-4 py-2">Latitude</th>
      <th class="px-4 py-2">Height</th>
      <th class="px-4 py-2">Pvm</th>
    </tr>
  </thead>
  <tbody class="text-gray-700">
    {#each localMastData.features as { properties, geometry } (properties.mtk_id)}
      <tr class="border-b border-gray-200 hover:bg-gray-100">
        <td class="px-4 py-2">{properties.mtk_id}</td>
        <td class="px-4 py-2">{geometry.coordinates[0]}</td>
        <td class="px-4 py-2">{geometry.coordinates[1]}</td>
        <td class="px-4 py-2">{properties.mastonkorkeusviittaus}</td>
        <td class="px-4 py-2">{properties.alkupvm}</td>
      </tr>
    {/each}
  </tbody>
</table>

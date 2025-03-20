<script lang="ts">
  import { excelClosestPoints, excelFeatures, excelHoveredMast, marker } from '$lib/state/features.svelte'
  import type { ExcelMast } from '$lib/types/data'
  import { distance } from '$lib/utils/distance'
  import Icon from '@iconify/svelte'
  import toast from 'svelte-french-toast'
  import { twMerge } from 'tailwind-merge'
  import { read, utils } from 'xlsx'

  let loading = $state(false)

  const handleFileUpload = async (e: Event) => {
    loading = true

    try {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (!file) throw new Error('No file selected')

      const rawFile = await file.arrayBuffer()

      const workbook = read(rawFile)
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = utils.sheet_to_json(sheet, { header: 1 })

      // Data is ['KOHDE', _, _, 'SITEHUNTER', 'KOORDINAATIT']
      // Where kohde, sitehunter and koordinaatit are all string. Koordinaatit is formatted like '60.12342134234, 24.1234'
      const coordRegex = /^(\d{1,3}\.\d{1,})\s*,\s*(\d{1,3}\.\d{1,})$/
      const goodLookingData = data.filter((row) => {
        if (typeof row !== 'object') return false
        const r = row as string[]
        if (typeof r[0] !== 'string' || typeof r[3] !== 'string' || typeof r[4] !== 'string') return false
        return coordRegex.test(r[4])
      }) as [string, unknown, unknown, string, string][]
      if (!goodLookingData.length) throw new Error('No valid data found.')

      excelFeatures.data = goodLookingData.map((row) => {
        const [kohde, _, __, sitehunter, koordinaatit] = row
        const [lat, lon] = koordinaatit.split(',').map((c) => parseFloat(c))
        return { kohde, sitehunter, coordinates: [lon, lat] } as ExcelMast
      })
    } catch (error) {
      console.error(error)
      const err = error as Error
      toast.error(err.message ?? 'Failed to read file')
    } finally {
      loading = false
    }
  }

  $effect(() => {
    if (!marker.point) return
    const from = marker.point
    const sorted = excelFeatures.data
      .map((point) => [point, distance(from, point.coordinates)] as [ExcelMast, number])
      .sort((a, b) => a[1] - b[1])

    excelClosestPoints.points = sorted.slice(0, 5)
  })
</script>

<div class="bg-emerald-50 p-4 rounded shadow flex flex-col gap-2">
  <h2 class="text-lg font-bold">Excel data</h2>

  {#if excelClosestPoints.points.length}
    <ul class="space-y-2">
      {#each excelClosestPoints.points as [point, d], i (point)}
        {@const distance = d.toFixed(2) + ' km'}
        <li
          class={twMerge(
            'flex justify-between hover:bg-blue-200 p-2 rounded gap-2',
            d < 2 ? 'bg-yellow-200 hover:bg-yellow-300' : '',
            d < 1 ? 'bg-red-200 hover:bg-red-300' : ''
          )}
          onmouseenter={() => (excelHoveredMast.mast = point)}
          onmouseleave={() => (excelHoveredMast.mast = null)}
        >
          <span>
            <span>{i + 1}.</span>
            <span class="font-bold">{distance}</span>
          </span>
          <span>{point.kohde}</span>
        </li>
      {/each}
    </ul>
  {/if}

  {#if loading}
    <Icon icon="line-md:loading-loop" />
  {:else}
    <div class="flex flex-row gap-2">
      {#if excelFeatures.data.length}
        <button
          class="bg-emerald-200 p-2 rounded cursor-pointer flex items-center justify-center"
          onclick={() => (excelFeatures.data = [])}
          title="Tyhjennä excel data"
        >
          <Icon icon="lets-icons:close-round-light" />
        </button>
      {/if}
      <label
        for="file"
        class="bg-emerald-200 p-2 rounded w-full cursor-pointer flex items-center gap-2 justify-center"
        title="Upload"
      >
        {excelFeatures.data.length ? 'Vaihda' : 'Lisää'} excel tiedosto
        <Icon icon="lets-icons:file-dock-add" />
      </label>
      <input id="file" type="file" accept=".xlsx,.xls,.xlsm,.xlsb" class="hidden" onchange={handleFileUpload} />
    </div>
  {/if}
</div>

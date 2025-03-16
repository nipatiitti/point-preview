/**
 * This script converts the masts data from EPSG:3067 to WGS84
 * and writes the result to a new file.
 *
 * Run by hand with node, bun or deno.
 */

import { fromEPSG3067 } from '$lib/utils/transformations'
// @ts-ignore this file will be run with bun by hand so we can use node modules
import fs from 'node:fs'
import data from './masts_EPSG3067.json'

const masts = []
for (const mast of data.features) {
  const transformedCoords = fromEPSG3067(mast.geometry.coordinates as [number, number])
  masts.push({
    ...mast,
    geometry: {
      ...mast.geometry,
      coordinates: transformedCoords
    }
  })
}

fs.writeFileSync(
  './masts_WGS84.json',
  JSON.stringify({
    type: 'FeatureCollection',
    features: masts
  })
)

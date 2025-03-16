import { PUBLIC_MAP_KEY } from '$env/static/public'
import localMastData from '$lib/data/masts_WGS84.json'
import { paikkatietoBaseUrl } from '.'

export type Mast = {
  type: 'Feature'
  id: string | number
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
  properties: {
    mtk_id: number
    sijaintitarkkuus: number
    korkeustarkkuus: number
    aineistolahde: number
    alkupvm: string
    suunta: number
    kohderyhma: number
    kohdeluokka: number
    mastonkorkeusviittaus: string
  }
}

export type MastCollection = {
  type: 'FeatureCollection'
  features: Mast[]
}

export const getMasts = async () => {
  const url = `${paikkatietoBaseUrl}/maastotiedot/features/v1/collections/masto/items?api-key=${PUBLIC_MAP_KEY}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/geo+json',
      'Content-Type': 'application/geo+json'
    }
  })
  const data = await response.json()
  return data as MastCollection
}

export const getLocalMasts = async () => {
  return localMastData as MastCollection
}

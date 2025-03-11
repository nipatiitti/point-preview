import type { LngLat } from 'maplibre-gl'

export const distance = (pointA: LngLat, pointB: LngLat) => {
  const R = 6371e3
  const φ1 = (pointA.lat * Math.PI) / 180
  const φ2 = (pointB.lat * Math.PI) / 180
  const Δφ = ((pointB.lat - pointA.lat) * Math.PI) / 180
  const Δλ = ((pointB.lng - pointA.lng) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return (R * c) / 1000 // in km
}

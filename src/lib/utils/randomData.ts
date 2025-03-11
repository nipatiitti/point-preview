import type { Point } from '$lib/types/data'

const randomBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const genRandomData = (zoom: number, center: [number, number], n: number): Point[] => {
  const [lng, lat] = center
  const data = []
  for (let i = 0; i < n; i++) {
    data.push({
      lat: randomBetween(lat - zoom, lat + zoom),
      lng: randomBetween(lng - zoom, lng + zoom),
      height: randomBetween(0, 100),
      name: i.toString(),
      id: i.toString()
    })
  }
  return data
}

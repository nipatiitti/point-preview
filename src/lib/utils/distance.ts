export const distance = (pointA: [number, number], pointB: [number, number]) => {
  const R = 6371e3
  const φ1 = (pointA[1] * Math.PI) / 180
  const φ2 = (pointB[1] * Math.PI) / 180
  const Δφ = ((pointB[1] - pointA[1]) * Math.PI) / 180
  const Δλ = ((pointB[0] - pointA[0]) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return (R * c) / 1000 // in km
}

export const direction = (pointA: [number, number], pointB: [number, number]) => {
  const φ1 = (pointA[1] * Math.PI) / 180
  const φ2 = (pointB[1] * Math.PI) / 180
  const Δλ = ((pointB[0] - pointA[0]) * Math.PI) / 180

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)

  let θ = Math.atan2(y, x)
  θ = (θ * 180) / Math.PI

  return (θ + 360) % 360
}

export const degToCompass = (num: number) => {
  const arr = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return arr[Math.floor((num % 360) / 45) % 8]
}

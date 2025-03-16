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

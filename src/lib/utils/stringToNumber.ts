/**
 * Convert a arbitrary string to always the same number
 * @param str - The string to convert
 * @returns The number
 */
export const stringToNumber = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

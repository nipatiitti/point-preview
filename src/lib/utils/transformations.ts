import proj4 from 'proj4'

// Define the projection
proj4.defs('EPSG:3067', '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs')

/**
 * "EPSG:3067" to "WGS84" transformation
 * @param coordinates Coordinates in "EPSG:3067" format
 * @returns Coordinates in "WGS84" format
 */
export const fromEPSG3067 = (coordinates: [number, number]) => {
  return proj4('EPSG:3067', 'WGS84', coordinates)
}

/**
 * "WGS84" to "EPSG:3067" transformation
 * @param coordinates Coordinates in "WGS84" format
 * @returns Coordinates in "EPSG:3067" format
 */
export const toEPSG3067 = (coordinates: [number, number]) => {
  return proj4('WGS84', 'EPSG:3067', coordinates)
}

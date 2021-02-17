import { bearing, destination, lineDistance, midpoint, distance } from '@turf/turf'
import lineArc from '@turf/line-arc'
import { toWgs84, toMercator } from '@turf/projection'
import { Coordinates } from './types/coordinates'


export function getArc(start: Coordinates, finish: Coordinates) : GeoJSON.Feature<GeoJSON.LineString> {
    let route: GeoJSON.LineString = {
      type: 'LineString',
      coordinates: [
        [start.longitude, start.latitude],
        [finish.longitude, finish.latitude]
      ]
    }
    route = toWgs84(route)
    const lineD = lineDistance((route as any) as GeoJSON.Feature<GeoJSON.LineString>)
    const mp = midpoint(
      (route.coordinates[0] as any) as GeoJSON.Feature<GeoJSON.Point>,
      (route.coordinates[1] as any) as GeoJSON.Feature<GeoJSON.Point>
    )
    const center = destination(
      mp,
      lineD,
      bearing(
        (route.coordinates[0] as any) as GeoJSON.Feature<GeoJSON.Point>,
        (route.coordinates[1] as any) as GeoJSON.Feature<GeoJSON.Point>
      ) + 90,
    )
    return toMercator(
      lineArc(
        center,
        distance(center, (route.coordinates[0] as any) as GeoJSON.Feature<GeoJSON.Point>),
        bearing(center, (route.coordinates[0] as any) as GeoJSON.Feature<GeoJSON.Point>),
        bearing(center, (route.coordinates[1] as any) as GeoJSON.Feature<GeoJSON.Point>),
        { steps: 100 }
      )
    )
  }
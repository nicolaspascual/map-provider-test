import { OverlayView } from '@react-google-maps/api'
import React from 'react'
import useSuperCluster from 'use-supercluster'
import { NumberMarkerIcon } from '../../icons'
import { Coordinates } from '../../types/coordinates'
import AvatarMarker from './AvatarMarker'

export default function AvatarClusterer(props: { coordinates: Coordinates[], bounds: [number, number, number, number], zoom: number }) {
  const points = props.coordinates.map(coord => ({
    type: "Feature",
    properties: { cluster: false },
    geometry: {
      type: "Point",
      coordinates: [
        coord.longitude,
        coord.latitude
      ]
    }
  }))
  const { clusters } = useSuperCluster({
    points, bounds: props.bounds, zoom: props.zoom
  })

  return <>{
    clusters.map((cluster, idx) => {
      const [longitude, latitude] = cluster.geometry.coordinates
      const {
        cluster: isCluster,
        point_count: pointCount
      } = cluster.properties


      if (isCluster) {
        return (
          <OverlayView
            key={idx}
            position={{ lat: latitude, lng: longitude }}
            mapPaneName='overlayMouseTarget'
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <NumberMarkerIcon
              users={Array(pointCount).fill({ firstName: "Nicolas", lastName: "Pascual" })}
            />
          </OverlayView>
        )
      }

      return (
        <AvatarMarker
          key={idx}
          user={{ firstName: "Nicolás", lastName: "Pascual" }}
          avatarURL={Math.random() > 0.5 ? "https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1" : undefined}
          latitude={latitude}
          longitude={longitude}
        />
      )
    })
  }</>
}

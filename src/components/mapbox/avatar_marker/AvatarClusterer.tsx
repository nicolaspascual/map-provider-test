import React from 'react'
import { FlyToInterpolator, Marker, ViewportProps } from 'react-map-gl'
import useSuperCluster from 'use-supercluster'
import { Coordinates } from '../../types/coordinates'
import AvatarMarker from './AvatarMarker'

export default function AvatarClusterer({ changeViewPort, ...props }: { coordinates: Coordinates[], bounds: [number, number, number, number], zoom: number, changeViewPort: (v: ViewportProps) => void }) {
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
  const { clusters, supercluster } = useSuperCluster({
    points, bounds: props.bounds, zoom: props.zoom
  })

  return <>{
    clusters.map(cluster => {
      const [longitude, latitude] = cluster.geometry.coordinates
      const {
        cluster: isCluster,
        point_count: pointCount
      } = cluster.properties


      if (isCluster) {
        return (
          <Marker
            key={`cluster-${cluster.id}`}
            latitude={latitude}
            longitude={longitude}
          >
            <div
              style={{
                backgroundColor: "red"
              }}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                )

                changeViewPort({
                  latitude,
                  longitude,
                  zoom: expansionZoom,
                  transitionInterpolator: new FlyToInterpolator({
                    speed: 2
                  })
                })
              }}
            >
              {pointCount}
            </div>
          </Marker>
        )
      }

      return (
        <AvatarMarker
          key={`crime-${cluster.properties.crimeId}`}
          latitude={latitude}
          longitude={longitude}
          img="https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1"
        />
      )
    })
  }</>
}

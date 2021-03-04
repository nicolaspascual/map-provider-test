import { OverlayView } from '@react-google-maps/api'
import React from 'react'
import useSuperCluster from 'use-supercluster'
import { LocatedTraveler } from '../../../App'
import { NumberMarkerIcon } from '../../icons'
import { Coordinates } from '../../types/coordinates'
import AvatarMarker from './AvatarMarker'

export default function AvatarClusterer(props: { locatedTravelers: LocatedTraveler[], bounds: [number, number, number, number], zoom: number }) {
  const points = props.locatedTravelers.map(locatedTraveler => ({
    type: "Feature",
    properties: { cluster: false, locatedTraveler },
    geometry: {
      type: "Point",
      coordinates: [
        locatedTraveler.locations[0].longitude,
        locatedTraveler.locations[0].latitude,
      ],
    }
  }))
  const { clusters, supercluster } = useSuperCluster({
    points, bounds: props.bounds, zoom: props.zoom
  })

  return <>{
    clusters.map((cluster, idx) => {
      const [longitude, latitude] = cluster.geometry.coordinates

      const {
        cluster: isCluster,
        locatedTraveler
      } = cluster.properties

      if (isCluster) {
        const locatedTravelers = supercluster.getLeaves(cluster.id, Infinity).map((e: any) => e.properties.locatedTraveler)

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
              users={locatedTravelers}
            />
          </OverlayView>
        )
      }

      return (
        <AvatarMarker
          key={idx}
          user={{ firstName: locatedTraveler.firstName, lastName: locatedTraveler.lastName }}
          avatarURL={locatedTraveler.avatar}
          latitude={latitude}
          longitude={longitude}
        />
      )
    })
  }</>
}

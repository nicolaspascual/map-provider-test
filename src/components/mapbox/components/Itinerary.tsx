import React, { useEffect } from 'react'
import { Layer, MapRef, Marker, Source} from 'react-map-gl'
import { AvatarItineraryIcon } from '../../icons'
import { Coordinates } from '../../types/coordinates'
import { getArc } from '../../utils'


type Props = {
  origin: Coordinates,
  destination: Coordinates,
  size?: number,
  user: {
    firstName: string,
    lastName: string
  }
  avatarURL?: string
  map: MapRef | null
}


export default function Itinerary(props: Props) {
  const id = `${props.origin.latitude}-${props.origin.longitude}-${props.destination.latitude}-${props.destination.longitude}`

  const arc = getArc(props.origin, props.destination)
  const arcCoords = arc.geometry.coordinates
  const middlePoint = arcCoords[Math.floor(arcCoords.length / 2)]

  useEffect(() => () => {
    if (props.map) {
      props.map.getMap().removeLayer(id)
      props.map.getMap().removeSource(id)
    }
  })

  return (
    <>
      <Marker
        latitude={middlePoint[1]}
        longitude={middlePoint[0]}
        offsetTop={-25}
        offsetLeft={-25}
      >
        <AvatarItineraryIcon
          user={props.user}
          avatarURL={props.avatarURL}
        />
      </Marker>
      <Source
        id={id}
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: [arc]
        }}
      />
      <Layer
        id={id}
        type="line"
        source={id}
        paint={{
          'line-width': 2,
          'line-color': '#007CBF'
        }}
      />
    </>
  )
}
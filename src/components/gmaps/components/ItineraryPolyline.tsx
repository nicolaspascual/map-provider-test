import React from 'react'
import { OverlayView, Polyline } from '@react-google-maps/api'
import { getArc } from '../../utils'
import { Coordinates } from '../../types/coordinates'
import { AvatarItineraryIcon } from '../../icons'

type Props = {
  origin: Coordinates,
  destination: Coordinates,
  size?: number,
  user: {
    firstName: string,
    lastName: string
  }
  avatarURL?: string
}

export default function Itinerary({ origin, destination, ...props }: Props) {
  const arc = getArc(origin, destination)
  const arcCoords = arc.geometry.coordinates
  const middlePoint = arcCoords[Math.floor(arcCoords.length / 2)]


  return (
    <>
      <OverlayView
        position={{ lat: middlePoint[1], lng: middlePoint[0] }}
        mapPaneName='overlayMouseTarget'
        getPixelPositionOffset={(width, height) => ({
          x: -(width / 2),
          y: -(height / 2),
        })}
      >
        <AvatarItineraryIcon
          user={props.user}
          avatarURL={props.avatarURL}
        />
      </OverlayView>

      <Polyline
      options={{strokeWeight: 1}}
        path={arc.geometry.coordinates.map(e => ({ lat: e[1], lng: e[0] }))}
      />
    </>
  )
}
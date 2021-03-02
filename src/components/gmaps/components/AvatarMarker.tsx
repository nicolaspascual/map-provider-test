import React, { useState } from 'react'
import { OverlayView } from '@react-google-maps/api'
import { AvatarMarkerIcon } from '../../icons'

type Props = {
  latitude: number,
  longitude: number,
  user: {
    firstName: string,
    lastName: string
  }
  avatarURL?: string
}

export default function AvatarMarker(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <OverlayView
      position={{ lat: props.latitude, lng: props.longitude }}
      mapPaneName='overlayMouseTarget'
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
      })}
    >
      <>
        {
          open && (
            <div style={{position: "relative", bottom: "-15px", left: "-100px",  backgroundColor: "white"}}>
              <h1>RANDOM HTML BEING DISPLAYED</h1>
            </div>
          )
        }
        <AvatarMarkerIcon
          user={props.user}
          avatarURL={props.avatarURL}
          onClick={() => setOpen(true)}
        />
      </>
    </OverlayView>
  )
}
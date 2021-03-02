import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
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
    <>
      <Marker latitude={props.latitude} longitude={props.longitude} offsetLeft={-25} offsetTop={-25}>
        <AvatarMarkerIcon
          user={props.user}
          avatarURL={props.avatarURL}
          onClick={() => setOpen(!open)}
        />
      </Marker>

      {
        open && (
          <Popup
            latitude={props.latitude}
            longitude={props.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setOpen(false)}
          >
            <div>
              <h1>RANDOM HTML BEING DISPLAYED</h1>
            </div>
          </Popup>
        )
      }
    </>
  )
}
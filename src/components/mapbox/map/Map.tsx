import React, { useMemo, useRef, useState } from 'react'
import MapGL, { MapRef } from 'react-map-gl'
import AvatarClusterer from '../avatar_marker/AvatarClusterer'
import Itinerary from '../components/Itinerary'

import mapboxgl from 'mapbox-gl'
import { LocatedTraveler } from '../../../App'

// @ts-expect-error
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default


export default function Map({ pin_positions, flight_positions, token }: { pin_positions: LocatedTraveler[], flight_positions: LocatedTraveler[], token: string }) {
  const mapRef = useRef<MapRef>(null)

  const [viewport, setViewport] = useState({
    latitude: pin_positions[0].locations[0].latitude,
    longitude: pin_positions[0].locations[0].latitude,
    zoom: 4,
    bearing: 0,
    pitch: 0
  })

  const bounds = mapRef.current
    ? mapRef.current
      .getMap()
      .getBounds()
      .toArray()
      .flat()
    : null

  const flights = useMemo(() => flight_positions.map((e, idx) => {
    const { latitude: origin_lat, longitude: origin_lng } = e.locations[0]
    const { latitude: destination_lat, longitude: destination_lng } = e.locations[1]
    return (
      <Itinerary
        key={idx}
        user={{ firstName: "Nicolás", lastName: "Pascual" }}
        avatarURL={Math.random() > 0.5 ? "https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1" : undefined}
        origin={{ latitude: origin_lat, longitude: origin_lng }}
        destination={{ latitude: destination_lat, longitude: destination_lng }}
        map={mapRef.current}
      />
    )
  }), [flight_positions])

  return (
    <MapGL
      {...viewport}
      ref={mapRef}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={setViewport}
      mapboxApiAccessToken={token}
    >
      <AvatarClusterer
        bounds={bounds}
        coordinates={pin_positions.map(e => (e.locations[0]))}
        zoom={viewport.zoom}
      />
      {flights}
    </MapGL>
  )
}
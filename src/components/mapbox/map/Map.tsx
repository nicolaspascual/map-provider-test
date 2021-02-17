import React, { useMemo, useRef, useState } from 'react'
import MapGL, { MapRef } from 'react-map-gl'
import AvatarClusterer from '../avatar_marker/AvatarClusterer'
import Itinerary from '../components/Itinerary'


export default function Map({ pin_positions, flight_positions, token }: { pin_positions: any[], flight_positions: any[], token: string}) {
  const mapRef = useRef<MapRef>(null)

  const [viewport, setViewport] = useState({
    latitude: (flight_positions[0] as any).origin_coords[0],
    longitude: (flight_positions[0] as any).origin_coords[1],
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
    const [origin_lat, origin_lng] = e.origin_coords
    const [destination_lat, destination_lng] = e.destination_coords
    return (
      <Itinerary 
        key={idx}
        map={mapRef.current}
        origin={{ latitude: origin_lat, longitude: origin_lng }}
        destination={{ latitude: destination_lat, longitude: destination_lng }}
        img="https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1"
      />
    )
  }), [flight_positions])

  return (
    <MapGL
      {...viewport}
      ref={mapRef}
      width="50vw"
      height="100vh"
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={setViewport}
      mapboxApiAccessToken={token}
    >
      <AvatarClusterer
        bounds={bounds}
        coordinates={pin_positions.map(e => ({ latitude: e.origin_coords[0], longitude: e.origin_coords[1] }))}
        changeViewPort={(opts) => setViewport({ ...viewport, ...opts })}
        zoom={viewport.zoom}
      />
      {flights}
    </MapGL>
  )
}
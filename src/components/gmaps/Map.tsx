import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import ItineraryPolyline from './components/ItineraryPolyline'
import AvatarClusterer from './components/AvatarClusterer'


export default function Map({ markers, flights, token }: { markers: any[], flights: any[], token: string }) {

  const initialCenter = {
    lat: (flights[0] as any).origin_coords[0],
    lng: (flights[0] as any).origin_coords[1],
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [zoom, setZoom] = React.useState<number | undefined>(4)
  const [center, setCenter] = React.useState<{ lat: number, lng: number }>(initialCenter)
  const [bounds, _setBounds] = React.useState<[number, number, number, number] | null>()


  const setBounds = () => {
    const currentBounds = map?.getBounds()
    if (currentBounds)
    _setBounds([currentBounds.getSouthWest().lng(), currentBounds.getSouthWest().lat(), currentBounds.getNorthEast().lng(), currentBounds.getNorthEast().lat()])
  }


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
    <GoogleMap
      options={{
        styles: require('./styles.json')
      }}
      mapContainerStyle={{
        width: "100vw",
        height: "100vh"
      }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onZoomChanged={() => setZoom(map?.getZoom())}
      onBoundsChanged={setBounds}
    >

      {bounds && zoom && (
        <AvatarClusterer
          bounds={bounds}
          coordinates={markers.map(e => ({ latitude: e.origin_coords[0], longitude: e.origin_coords[1] }))}
          zoom={zoom}
        />
      )}

      { map && zoom &&
        flights.map((k, idx) => {
          const [origin_lat, origin_lng] = k['origin_coords']
          const [destination_lat, destination_lng] = k['destination_coords']
          return (
            <ItineraryPolyline
              key={idx}
              user={{ firstName: "Nicolás", lastName: "Pascual" }}
              avatarURL={Math.random() > 0.5 ? "https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1" : undefined}
              origin={{ latitude: origin_lat, longitude: origin_lng }}
              destination={{ latitude: destination_lat, longitude: destination_lng }}
            />
          )
        })
      }

    </GoogleMap>
  ) : <></>
}
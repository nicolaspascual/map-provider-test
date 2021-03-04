import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import ItineraryPolyline from './components/ItineraryPolyline'
import AvatarClusterer from './components/AvatarClusterer'
import { LocatedTraveler } from '../../App'


export default function Map({ markers, flights, token }: { markers: LocatedTraveler[], flights: LocatedTraveler[], token: string }) {

  const initialCenter = {
    lat: markers[0].locations[0].latitude,
    lng: markers[0].locations[0].latitude,
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
          locatedTravelers={markers}
          zoom={zoom}
        />
      )}

      { map && zoom &&
        flights.map((k, idx) => {
          const { latitude: origin_lat, longitude: origin_lng } = k.locations[0]
          const { latitude: destination_lat, longitude: destination_lng } = k.locations[1]
          return (
            <ItineraryPolyline
              key={idx}
              user={{ firstName: k.firstName, lastName: k.lastName }}
              avatarURL={k.avatar}
              origin={{ latitude: origin_lat, longitude: origin_lng }}
              destination={{ latitude: destination_lat, longitude: destination_lng }}
            />
          )
        })
      }

    </GoogleMap>
  ) : <></>
}
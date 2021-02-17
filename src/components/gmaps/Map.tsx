import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerClusterer } from '@react-google-maps/api'
import AvatarMarker from './components/AvatarMarker'
import ItineraryPolyline from './components/ItineraryPolyline'


export default function Map({ markers, flights, token }: { markers: any[], flights: any[], token: string }) {

  const center = {
    lat: (markers[0] as any).origin_coords[0],
    lng: (markers[0] as any).origin_coords[1],
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: token
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [zoom, setZoom] = React.useState<number | undefined>(8)


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
        width: "50vw",
        height: "100vh"
      }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onZoomChanged={() => setZoom(map?.getZoom())}
    >
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {(clusterer) => markers.slice(1, 2).map((k, idx) => {
          const [lat, lng] = k['origin_coords']
          return (
            <AvatarMarker
              key={idx}
              img="https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1"
              position={{ lat, lng }}
              clusterer={clusterer}
            />
          )
        })
        }
      </MarkerClusterer>

      { map && zoom &&
        flights.map((k, idx) => {
          const [origin_lat, origin_lng] = k['origin_coords']
          const [destination_lat, destination_lng] = k['destination_coords']
          return (
            <ItineraryPolyline
              key={idx}
              img="https://i1.wp.com/nypost.com/wp-content/uploads/sites/2/2020/01/cow-feature.jpg?quality=80&strip=all&ssl=1"
              origin={{ latitude: origin_lat, longitude: origin_lng }}
              destination={{ latitude: destination_lat, longitude: destination_lng }}
            />
          )
        })
      }

    </GoogleMap>
  ) : <></>
}
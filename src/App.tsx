import React from 'react'
import MapBox from './components/mapbox/map'
import GoogleMap from './components/gmaps/Map'


const flights_json = require('./res/flights.json')
const N_ITEMS = 50


function App() {

  const pin_positions: any[] = Object.values(flights_json).slice(1, Math.floor(N_ITEMS / 2))
  const flight_positions: any[] = Object.values(flights_json).slice(Math.floor(N_ITEMS / 2), N_ITEMS)

  console.log(process.env)

  return (
    <div style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }}>
      <div style={{ width: "50vw", height: '100vh', float: 'right' }}>
        <MapBox
          token={MAPBOX_TOKEN}
          flight_positions={flight_positions} pin_positions={pin_positions}
        />
      </div>

      <div style={{ width: "50vw", height: '100vh' }}>
        <GoogleMap
          token={GMAPS_TOKEN}
          flights={flight_positions} markers={pin_positions}
        />
      </div>
    </div>
  )
}

export default App

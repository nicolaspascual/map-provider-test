import React from 'react'
import MapBox from './components/mapbox/map'
import GoogleMap from './components/gmaps/Map'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


const flights_json = require('./res/flights.json')
const N_MARKERS = 100
const N_ITINERARIES = 10
const GMAPS_TOKEN = "<secret>";
const MAPBOX_TOKEN = // Save to share, public key
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";


function App() {

  const pin_positions: any[] = Object.values(flights_json).slice(1, N_MARKERS)
  const flight_positions: any[] = Object.values(flights_json).slice(N_MARKERS, N_MARKERS + N_ITINERARIES)

  console.log(process.env)

  return (
    <div style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }}>
      <div style={{ width: "100vw", height: '100vh', float: 'right' }}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/gmaps">GMaps</Link>
                </li>
                <li>
                  <Link to="/mapbox">Mapbox</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/mapbox">
                <MapBox
                  token={MAPBOX_TOKEN}
                  flight_positions={flight_positions} pin_positions={pin_positions}
                />
              </Route>
              <Route path="/gmaps">
                <GoogleMap
                  token={GMAPS_TOKEN}
                  flights={flight_positions} markers={pin_positions}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>

    </div>
  )
}

export default App

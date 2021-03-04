import React from 'react'
import MapBox from './components/mapbox/map'
import GoogleMap from './components/gmaps/Map'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"


const flights_json = require('./res/api_result.json')
const GMAPS_TOKEN = "<secret>";
const MAPBOX_TOKEN = // Save to share, public key
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";


export type LocatedTraveler = {
  firstName: string,
  lastName: string,
  avatar: string,
  trip: {
    id: number,
    purpose: string,
    start_date: Date,
    end_date: Date
  }
  locations: {
    latitude: number,
    longitude: number
  }[]
}


function App() {

  let fixed_positions: LocatedTraveler[] = []
  let in_transit: LocatedTraveler[] = []

  flights_json.forEach((trip: any) => {
    trip.travelers.forEach((traveler: any) => {
      if (trip.locations.length === 1) {
        fixed_positions.push({
          avatar: traveler.profile_picture,
          firstName: traveler.first_name,
          lastName: traveler.last_name,
          locations: trip.locations.map((e: [number, number]) => ({latitude: e[0], longitude: e[1]})),
          trip: {
            id: trip.trip_id,
            end_date: trip.trip_end_date,
            start_date: trip.trip_start_date,
            purpose: trip.trip_purpose
          }
        })
      } else if (trip.locations.length === 2) {
        in_transit.push({
          avatar: traveler.profile_picture,
          firstName: traveler.first_name,
          lastName: traveler.last_name,
          locations: trip.locations.map((e: [number, number]) => ({latitude: e[0], longitude: e[1]})),
          trip: {
            id: trip.trip_id,
            end_date: trip.trip_end_date,
            start_date: trip.trip_start_date,
            purpose: trip.trip_purpose
          }
        })
      }
    });
  })

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
                  flight_positions={in_transit} pin_positions={fixed_positions}
                />
              </Route>
              <Route path="/gmaps">
                <GoogleMap
                  token={GMAPS_TOKEN}
                  flights={in_transit} markers={fixed_positions}
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

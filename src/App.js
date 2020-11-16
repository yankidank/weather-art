import React, { useState, useEffect } from 'react';
import BigDataLocation from "./components/BigDataLocation";
import OpenWeather from "./components/OpenWeather";

function App() {
  // Default States
  const [GPS, setGPS] = useState({ lat: null, lon: null });

  // Prevent infinite render loop
  if(GPS.lat === null){
    // GPS coordinates from navigator
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    function getPosition(position) {
      // Update GPS
      setGPS({lat: position.coords.latitude, lon: position.coords.longitude})
    }

  }
  
	useEffect(() => {
	
	}, [])

  return (
    <div className="App">
      <BigDataLocation GPS={GPS} />
      <OpenWeather GPS={GPS} />
    </div>
  );
}

export default App;

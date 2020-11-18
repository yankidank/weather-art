import React, { useState, useEffect } from 'react';
import BigDataLocation from "./components/BigDataLocation";
import OpenWeather from "./components/OpenWeather";
import Art from "./components/Art";

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
      <div className="footer">
        {/* TBD: Pass the weather */}
        <Art weather={GPS} />
      </div>
      <div className="header">
        <BigDataLocation GPS={GPS} />
      </div>
      <div className="sidebar">
        <OpenWeather GPS={GPS} />
      </div>
      <div className="main">
        {/* INTENTIONALLY BLANK */}
      </div>
    </div>
  );
}

export default App;

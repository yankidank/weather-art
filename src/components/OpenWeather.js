import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

// Expects GPS object with latitude and longitude values
function OpenWeather(props) {
	const {GPS} = props;
	const openWeatherAPI = process.env.REACT_APP_OPENWEATHERAPI; // Configure API in .env.local
	const [loading, setLoading] = useState(true);
	const [weather, setWeather] = useState({});

	useEffect(() => {
		if(GPS.lat != null){ // Wait for coordinates
			axios
			.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${GPS.lat}&lon=${GPS.lon}&exclude=minutely,alerts&units=imperial&appid=${openWeatherAPI}`)
			.then(res => {
				setWeather(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.log(err)
			})
		}
	}, [ GPS, openWeatherAPI ])

	return (
		<div className="OpenWeather">
			{!loading ? 
				<div className="weather-data api-complete">
					<div className="weather-data-item">
						<span className="weather-data-title">Temp:</span>
						<span className="weather-data-element">
							{weather.current.temp ? weather.current.temp+'° F' : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">Updated:</span>
						<span className="weather-data-element">
							<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.dt ? weather.current.dt : ''}</SimpleDateTime>
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">Sunrise:</span>
						<span className="weather-data-element">
							<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.sunrise ? weather.current.sunrise : ''}</SimpleDateTime>
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">Sunset:</span>
						<span className="weather-data-element">
							<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.sunset ? weather.current.sunset : ''}</SimpleDateTime>
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">UV Index:</span>
						<span className="weather-data-element">
							{weather.current.uvi ? weather.current.uvi : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">Wind Speed:</span>
						<span className="weather-data-element">
							{weather.current.wind_speed ? weather.current.wind_speed+'mph' : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title">Condition:</span>
						<span className="weather-data-element">
							{weather.current.weather[0].main ? weather.current.weather[0].main : ''}
						</span>
					</div>	
				</div>
			:
				<div className="weather-data api-loading">
					Loading...
				</div>
			}
		</div>
	)

}

export default OpenWeather;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import './OpenWeather.css';

// Expects GPS object with latitude and longitude values
function OpenWeather(props) {
	const {GPS} = props;
	const openWeatherAPI = process.env.REACT_APP_OPENWEATHERAPI; // Configure API in .env.local
	const [loading, setLoading] = useState(true);
	const [weather, setWeather] = useState({});
	
	const now = Date.now();
	const timestamp = now.toString().substring(0,10);

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
						<span className="weather-data-element weather-temp">
							{weather.current.temp ? Math.round(weather.current.temp)+'°' : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-element weather-condition">
							{weather.current.weather[0].main ? weather.current.weather[0].main : ''}
						</span>
					</div>
					{/* 
						ADD 24 HR HIGH / LOW
					*/}
					<div className="weather-data-item weather-detail-spacer">
						<span className="weather-data-title weather-twilight">
							{timestamp < weather.current.sunrise ?
								'Sunrise'
								:
							timestamp > weather.current.sunset ?
								'Sunrise'
								:
								'Sunset'
							}
						</span>
						<span className="weather-data-element weather-twilight">
							{timestamp < weather.current.sunrise ?
								<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.sunrise ? weather.current.sunrise : ''}</SimpleDateTime>
							: timestamp > weather.current.sunset ?
								<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.sunrise ? weather.current.sunrise : ''}</SimpleDateTime>
							:
								<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{weather.current.sunset ? weather.current.sunset : ''}</SimpleDateTime>
							}
							{/*	<SimpleDateTime format="YMD" showDate="0" dateSeparator="/" timeSeparator=":" meridians="1">{timestamp ? timestamp : ''}</SimpleDateTime> */}	
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title weather-wind">
							Winds
						</span>
						<span className="weather-data-element weather-wind">
							{weather.current.wind_speed ? Math.round(weather.current.wind_speed)+' mph' : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-title weather-uvi">
							UV Index
						</span>
						<span className="weather-data-element weather-uvi">
							{weather.current.uvi ? Math.round(weather.current.uvi) : ''}
						</span>
					</div>
					<div className="weather-data-item">
						<span className="weather-data-element weather-forecast">
							<a href="#">5 Day Forecast</a>
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
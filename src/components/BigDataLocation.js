import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BigDataLocation.css';

// Expects GPS object with latitude and longitude values
function BigDataLocation(props) {

	const {GPS} = props; // Lat + Lon from Navigator
	const [location, setLocation] = useState({});

	useEffect(() => {
		if(GPS.lat != null){
			axios
			.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${GPS.lat}&longitude=${GPS.lon}&localityLanguage=en`)
			.then(res => {
				// console.log(res.data)
				setLocation(res.data)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}, [ GPS ])

	return (
		<div className="BigDataLocation">
			{/* <div className="BigDataLocality">{location.locality}</div> */}
			<div className="BigDataCity">{location.city}</div>
			{/* 
			<div className="BigDataCityState">{location.city}{location.principalSubdivision ? ', '+location.principalSubdivision : null}</div>
			<div className="BigDataPost">{location.postcode}</div>
			<div className="BigDataCountry">{location.countryName} {location.countryCode ? '('+location.countryCode+')' : null}</div> 
			*/}
		</div>
	)

}

export default BigDataLocation;
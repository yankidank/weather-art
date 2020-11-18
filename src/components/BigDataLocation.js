import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BigDataLocation.css';

// Expects GPS object with latitude and longitude values
function BigDataLocation(props) {

	const setStorage = (data) => (
		localStorage.setItem('weatherArtLocation', data)
	)
	const getStorage = () => (
		localStorage.getItem('weatherArtLocation')
	)
	const removeStorage = () => (
		localStorage.removeItem('weatherArtLocation')
	)
	/* const clearStorage = () => (
		localStorage.clear()
	) */

	const {GPS} = props; // Lat + Lon from Navigator
	const [location, setLocation] = useState({});
	const [savedLocation, setSavedLocation] = useState(getStorage);
	
	if (savedLocation && savedLocation.latitude && savedLocation.longitude ){
		// Stored GPS
		// console.log(savedLocation.latitude);
		// console.log(savedLocation.longitude);
	} else {
		// Request GPS position
	}

	useEffect(() => {
		// Passed GPS
		if(GPS.lat != null){
			axios
			.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${GPS.lat}&longitude=${GPS.lon}&localityLanguage=en`)
			.then(res => {
				setLocation(res.data)
				setSavedLocation(res.data)
				setStorage(res.data)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}, [ GPS ])

	return (
		<div className="BigDataLocation">
			<div className="BigDataCity">{location.city} <span className="removeStored" onClick={removeStorage}>x</span></div>
		</div>
	)

}

export default BigDataLocation;
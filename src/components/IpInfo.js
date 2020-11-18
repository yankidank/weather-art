import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IpInfo.css';

// IP to Location API
function IpInfo() {

	const setStorage = (data) => (
		localStorage.setItem('artLocation', data)
	)
	const getStorage = () => (
		localStorage.getItem('artLocation')
	)
	const removeStorage = () => (
		localStorage.removeItem('artLocation')
	)
	/* const clearStorage = () => (
		localStorage.clear()
	) */

	const [loading, setLoading] = useState(true);
	const [savedLocation, setSavedLocation] = useState(getStorage);
	
	if (savedLocation && savedLocation.latitude && savedLocation.longitude ){
		// Stored GPS
		// console.log(savedLocation.latitude);
		// console.log(savedLocation.longitude);
	} else {
		// Request GPS position
	}
	
	useEffect(() => {
		const ipInfoAPI = process.env.REACT_APP_IPINFO_API; // Configure API in .env.local

		if(loading){
			axios
			.get(`https://ipinfo.io?token=${ipInfoAPI}`)
			.then(res => {
				setSavedLocation(res.data) // Update display
				setStorage(res.data) // localStorage function
				setLoading(false)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}, [loading])

	return (
		<div className="IpInfo">
			{!loading ? 
				<React.Fragment>
					<div className="IpInfoCity">
						{savedLocation.city}
						{/* <span className="removeStored" onClick={removeStorage}>x</span> */}
					</div>
					{/* 
					<div className="IpInfoRegion">{savedLocation.region} </div>
					<div className="IpInfoCountry">{savedLocation.country} </div>
					<div className="IpInfoLoc">
						{savedLocation.loc.split(',')[0]},
						{savedLocation.loc.split(',')[1]}
					</div>
					<div className="IpInfoPostal">{savedLocation.postal} </div>
					<div className="IpInfoIP">{savedLocation.ip} </div> 
					*/}
				</React.Fragment>
			:
				<div className="IpInfoLoading">Loading...</div>
			}
		</div>
	)

}

export default IpInfo;
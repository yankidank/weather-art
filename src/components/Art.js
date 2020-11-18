import React from 'react';
// import _ from 'lodash';
import imgLibrary from '../imgLibrary.json';
import './Art.css';

// TBD: filter based on passed weather condition 
// var night = imgLibrary.filter(artwork => artwork.attributes.time === 'night');
// var day = imgLibrary.filter(artwork => artwork.attributes.time === 'day');
// var twilight = imgLibrary.filter(artwork => artwork.attributes.time === 'twilight');
const filteredImg = imgLibrary.filter(artwork => artwork.attributes.time === 'day');

function Art(props) {
	// const {weather} = props;

	return (
		<div className="Art">
			{filteredImg.slice(0, 1).map(art => (
				<div key={art._id} className="art-wrapper">
					<div className="art-wallpaper">
						<div className="art-src"><img src={art.src} alt={art.title} /></div>
					</div>
					<div className="art-details">
						<div className="art-artist">{art.artist}</div>
						<div className="art-title">{art.title} ({art.date})</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Art

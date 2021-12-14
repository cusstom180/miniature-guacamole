import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 42.716987154458685,
    lng: -83.12513891049745
};
const libraries = ["places"];

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    )
}
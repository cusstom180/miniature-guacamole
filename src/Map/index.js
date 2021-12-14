/*global google*/
import React from 'react'
import { Autocomplete, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const mapRef = React.useRef();

    function onLoad(autocomplete) {
        //console.log('autocomplete: ', autocomplete);

        let request = {
            query: "Museum of Contemporary Art Australia",
            fields: ["name", "geometry"]
        };

        console.log(window);

        let service = google.maps.places.PlacesService(mapRef);

        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    //coords.push(results[i]);
                }

                this.setState({
                    center: results[0].geometry.location,
                    //coordsResult: coords
                });
            }
        });

    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
        >
            <Autocomplete
                onLoad={onLoad}
            >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                    }}
                />
            </Autocomplete>
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    )
}
/*global google*/
import React, { useState } from 'react'
import { Autocomplete, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 42.716987154458685,
    lng: -83.12513891049745
};

function getDamGoogle({ map, request }) {
    let service = google.maps.places.PlacesService(map);
    console.log(service);
    console.log(request);
}

export default function Map() {

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const { inputValue, setInputValue } = useState([]);

    function onLoad(autocomplete) {
        //console.log('autocomplete: ', autocomplete);

        let request = {
            query: "Museum of Contemporary Art Australia",
            fields: ["name", "geometry"]
        };
        getDamGoogle({ mapRef, request });

        // let service = google.maps.places.PlacesService(mapRef);
        // console.log(service);
        // service.findPlaceFromQuery(request, (results, status) => {
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //         for (var i = 0; i < results.length; i++) {
        //             //coords.push(results[i]);
        //         }

        //         this.setState({
        //             center: results[0].geometry.location,
        //             //coordsResult: coords
        //         });
        //     }
        // });
    }

    function handleSelect() {

    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onMapLoad}
        >
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={handleSelect}
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


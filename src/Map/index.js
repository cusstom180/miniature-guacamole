/*global google*/
import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import "@reach/combobox/styles.css";
import PlacesAutocomplete from './PlacesAutocomplete';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 42.716987154458685,
    lng: -83.12513891049745
};

const options = {
    //styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const getDamGoogle = ({ map, request }) => {
    let service = google.maps.places.PlacesService(map);
    console.log("service:" + service);
    console.log("request:" + request);
}

export default function Map() {

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMarkerClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            },
        ]);
    }, []);

    const getDamGoogle2 = (request) => {
        let service = google.maps.places.PlacesService(mapRef);
        console.log("service:" + service);
        console.log("request:" + request);
    }

    return (
        <div>
            <PlacesAutocomplete map={mapRef} getGooglePlaces={getDamGoogle} ></PlacesAutocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={options}
                onLoad={onMapLoad}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
                <Marker
                    //key={`${marker.lat}-${marker.lng}`}
                    position={{ lat: 42.716987154458685, lng: -83.12513891049745 }}
                    onClick={() => {
                        setSelected(true);
                    }}
                    icon={{
                        url: `/bear.svg`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
                {selected ? (
                    <InfoWindow
                        position={{ lat: 42.716987154458685, lng: -83.12513891049745 }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                <span role="img" aria-label="bear">
                                    🐻
                                </span>{" "}
                                Alert
                            </h2>
                            <p>put place details here</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>

    )
}



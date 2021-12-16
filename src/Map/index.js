/*global google*/
import React, { useState } from 'react'
import { GoogleMap } from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const { inputValue, setInputValue } = useState();

    function onLoad({ autocomplete, setInputValue }) {
        //console.log('autocomplete: ', autocomplete);

        let request = {
            query: "Museum of Contemporary Art Australia",
            fields: ["name", "geometry"]
        };
        getDamGoogle({ mapRef, request, setInputValue });

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
        var stuff = this.getPlace();
        setInputValue(stuff.geometry.location.lat());

        console.log(inputValue);
    }

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    return (
        <div>
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onMapLoad}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </div>

    )
}


function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="/compass.svg" alt="compass" />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}


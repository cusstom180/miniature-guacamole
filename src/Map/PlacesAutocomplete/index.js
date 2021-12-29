import React, { useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";

const baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/";



const getDamGoogle = ({ map, request }) => {
    console.log(window);
    // let service = google.maps.places.PlacesService(map);
    // console.log("service:" + service);
    // console.log("request:" + request);
}

export default function PlacesAutocomplete(props) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const [latLong, setLatLong] = useState({
        lat: "",
        lng: ""
    });
    const latLngPlace

    const handleSelect = (val) => {
        setValue(val, false);
        console.log(val);
        clearSuggestions();

        getGeocode({ address: val })
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                const { lat, lng } = latLng;

                console.log("Coordinates: ", { lat, lng });

                panTo({
                    lat: latLng.lat,
                    lng: latLng.lng,
                });

                setLatLong({
                    lat: latLng.lat,
                    lnt: latLng.lnt
                });

                // var results = props.getGooglePlaces(latLng);
                let service = props.google;
                ///.nearbySearch(latLng);
                //console.log("service: ", service);
                //console.log(service);
                //console.log(props.map);
            })

            .catch((error) => {
                console.log("Error: ", error);
            });
    };

    const panTo = React.useCallback(({ lat, lng }) => {
        props.map.current.panTo({ lat, lng });
        props.map.current.setZoom(10);
    }, []);

    return (
        <Combobox onSelect={handleSelect} aria-labelledby="demo">
            <ComboboxInput value={value} onChange={handleInput} disabled={!ready} />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );

}
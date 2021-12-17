import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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

                getDamGoogle(props.map, latLng);
                // var results = props.getGooglePlaces(latLng);
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
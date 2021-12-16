import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import React from 'react';

import "@reach/combobox/styles.css";

export default function PlacesAutocomplete() {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
        //console.log(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address);
        console.log(address);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            //panTo({ lat, lng });
            console.log(lat, lng);
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    //  i want to pass the map ref to this function
    const panTo = React.useCallback(({ lat, lng }) => {
        //mapRef.current.panTo({ lat, lng });
        //mapRef.current.setZoom(14);
    }, []);

    return (
        <div
            ref={ref}
            className="search"
        >
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
        </div>
    );
};
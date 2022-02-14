import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Autocomplete = (props) => {

    const [value, setValue] = React.useState('');
    console.log(value);

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API}
                selectProps={{
                    value,
                    onChange: (setValue),
                }}
                onSelect={(e) => {
                    props.SelectedCity(e.target.value);
                }}
            />
        </div>
    )

}

export default Autocomplete;
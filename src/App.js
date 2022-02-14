import React from 'react';
import Map from './Map';
import './App.css';
import Autocomplete from './AutoComplete';

function App() {

  const [selectedCity, setSelectedCity] = React.useState('');

  const onSelectAutoComplete = (value) => {
    setSelectedCity(value);
  };

  return (
    <div className="App">
      <Autocomplete SelectedCity={onSelectAutoComplete} />
      <Map />
      <h2>{selectedCity}</h2>
    </div>
  );
}

export default App;

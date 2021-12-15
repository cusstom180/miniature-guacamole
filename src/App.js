import './App.css';
import Map from './Map';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ["places"];

export default function App() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  return isLoaded ? <Map /> : null

  // return (
  //   <div className="App">
  //     <Map ></Map>
  //   </div>
  // );
}

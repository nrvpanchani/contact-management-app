import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkImg from "../assets/image/marker.png"
import 'leaflet/dist/leaflet.css'; // Make sure to include the leaflet CSS

// Define the custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: MarkImg, // Replace with the path to your icon
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

// Function to fetch country data
const fetchCountriesData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
  return data;
};

// Map component
const Map = React.memo(() => {
  const { data: countries, isLoading, error } = useQuery('countriesData', fetchCountriesData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {countries?.map((country: { countryInfo: { _id: React.Key | null | undefined; lat: number; long: number; }; country: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; recovered: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; deaths: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
        <Marker
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={customIcon} // Use customIcon here
        >
          <Popup>
            <h2>{country.country}</h2>
            <p>Active: {country.active}</p>
            <p>Recovered: {country.recovered}</p>
            <p>Deaths: {country.deaths}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

export default Map;

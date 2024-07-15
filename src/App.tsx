import { useEffect, useState } from 'react';
import './App.css';
import { AddCity } from './components/addCity/AddCity';
import { DisplayCities } from './components/displayCities/DisplayCities';
import { City } from './models/City';
import axios from 'axios';

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const getCities = async () => {
    const res = await axios.get('http://localhost:3000/cities');

    console.log('data:', res.data);
    return res.data;
  };

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await getCities();
      setCities(cities);
    };

    fetchCities();
  }, []);

  return (
    <>
      <AddCity />
      <DisplayCities cities={cities} />
    </>
  );
}

export default App;

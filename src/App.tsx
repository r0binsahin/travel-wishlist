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
  const updateCityOnDatabase = async (city: City) => {
    try {
      axios.patch(`http://localhost:3000/cities/${city.id}`, {
        isVisited: city.isVisited,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (id: string) => {
    cities.map((city) => {
      if (city.id === id) {
        const updatedCity = { ...city, isVisited: !city.isVisited };
        updateCityOnDatabase(updatedCity);
        setCities([...cities, updatedCity]);
        console.log('updated:', updatedCity);
        return updatedCity;
      }
    });
  };

  const addCity = async (name: string) => {
    try {
      const newCity = { name, isVisited: false };
      const res = await axios.post('http://localhost:3000/cities', newCity);
      setCities([...cities, res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AddCity addCity={addCity} />
      <DisplayCities cities={cities} handleChange={handleChange} />
    </>
  );
}

export default App;

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

  const handleChange = async (id: string) => {
    const cityIndex = cities.findIndex((city) => city.id === id);

    const updatedCity = {
      ...cities[cityIndex],
      isVisited: !cities[cityIndex].isVisited,
    };

    setCities(
      cities.map((city, index) => (index === cityIndex ? updatedCity : city))
    );

    /*     try {
      await axios.patch(`http://localhost:3000/cities/${id}`, {
        isVisited: updatedCity.isVisited,
      });
    } catch (error) {
      console.error('Failed to update city in database:', error);
    } */
  };

  const addCity = async (name: string) => {
    try {
      const newCity = { id: new Date().toString(), name, isVisited: false };
      /*      const res = await axios.post('http://localhost:3000/cities', newCity); */
      setCities([...cities, newCity]);
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

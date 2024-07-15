import { useEffect, useState } from 'react';
import './App.css';
import { AddCity } from './components/addCity/AddCity';
import { DisplayCities } from './components/displayCities/DisplayCities';
import { City } from './models/City';
import { randomId } from './utils/randonId';

function App() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    } else {
      setCities([
        {
          id: '1',
          name: 'Stockholm',
          isVisited: false,
        },
        {
          id: '2',
          name: 'Helsinki',
          isVisited: false,
        },
        {
          id: '3',
          name: 'Oslo',
          isVisited: true,
        },
        {
          id: '4',
          name: 'Copenhagen',
          isVisited: true,
        },
      ]);
    }
  }, []);

  const handleChange = async (id: string) => {
    const cityIndex = cities.findIndex((city) => city.id === id);

    if (cityIndex !== -1) {
      const updatedCity = {
        ...cities[cityIndex],
        isVisited: !cities[cityIndex].isVisited,
      };

      const updatedCities = cities.map((city, index) =>
        index === cityIndex ? updatedCity : city
      );
      localStorage.setItem('cities', JSON.stringify(updatedCities));

      setCities(updatedCities);
    }
  };

  const addCity = async (name: string) => {
    try {
      const newCity = { id: randomId(), name, isVisited: false };
      const updatedCities = [...cities, newCity];

      localStorage.setItem('cities', JSON.stringify(updatedCities));

      setCities(updatedCities);
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

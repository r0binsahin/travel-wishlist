import { useState } from 'react';
import { City } from '../../models/City';
import './displayCities.css';
import axios from 'axios';

interface DisplayCitiesProps {
  cities: City[];
}

export const DisplayCities = ({ cities }: DisplayCitiesProps) => {
  const citiesToVisit = cities.filter((city) => city.isVisited === false);
  const visitedCities = cities.filter((city) => city.isVisited === true);

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
        console.log('updated:', updatedCity);
        return updatedCity;
      }
    });
  };

  return (
    <div className='cities-container'>
      <div className='cities-toVisit'>
        <h3>Cities to visit</h3>
        <div className='cities-wrapper'>
          {citiesToVisit.map((city, index) => (
            <div className='city' key={index}>
              <label>
                {city.name}
                <input
                  type='checkbox'
                  checked={city.isVisited}
                  onChange={() => handleChange(city.id)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className='visited-cities'>
        <h3>Visited Cities</h3>
        <div className='cities-wrapper'>
          {visitedCities.map((city, index) => (
            <div className='city' key={index}>
              <label>
                {city.name}
                <input
                  type='checkbox'
                  checked={city.isVisited}
                  onChange={() => handleChange(city.id)}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

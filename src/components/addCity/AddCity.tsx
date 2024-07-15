import { useState } from 'react';
import './addCity.css';

interface AddCityPorps {
  addCity: (cityName: string) => void;
}
export const AddCity = ({ addCity }: AddCityPorps) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName.trim()) {
      alert('Please enter a city name.');
      return;
    }
    addCity(cityName);
    setCityName('');
  };

  return (
    <form onSubmit={handleSubmit} className='add-city-form'>
      <input
        type='text'
        placeholder='Add a new city to your wishlist'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type='submit'>Add City</button>
    </form>
  );
};

import { City } from '../../models/City';
import './displayCities.css';

interface DisplayCitiesProps {
  cities: City[];
  handleChange: (id: string) => void;
}

export const DisplayCities = ({ cities, handleChange }: DisplayCitiesProps) => {
  const citiesToVisit = cities.filter((city) => city.isVisited === false);
  const visitedCities = cities.filter((city) => city.isVisited === true);

  return (
    <div className='cities-container'>
      <h1>
        🥳 <strong style={{ color: '#9A4C95' }}>Congrats! </strong>
        You have visited{' '}
        <strong style={{ color: '#D72638', fontSize: '38px' }}>
          {visitedCities.length}
        </strong>{' '}
        cities ✈️ 🚂 🚴‍♀️
      </h1>
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

import { City } from '../../models/City';
import './displayCities.css';

interface DisplayCitiesProps {
  cities: City[];
}

export const DisplayCities = ({ cities }: DisplayCitiesProps) => {
  const citiesToVisit = cities.filter((city) => city.isVisited === false);

  const visitedCities = cities.filter((city) => city.isVisited === true);

  console.log('visitied:', visitedCities);

  return (
    <div className='cities-container'>
      <div className='cities-toVisit'>
        <h3>Cities to visit</h3>
        <div className='cities-wrapper'>
          {citiesToVisit.map((city) => (
            <span>{city.name}</span>
          ))}
        </div>
      </div>

      <div className='visited-cities'>
        <h3>Visited Cities</h3>
        <div className='cities-wrapper'>
          {visitedCities.map((city) => (
            <span>{city.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

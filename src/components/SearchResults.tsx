import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LoadingPlaces } from './';
import { Feature } from '../interfaces/placesResponse';
import { useRouteBetweenPoints } from '../hooks';

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useSelector(
    (state: RootState) => state.places
  );
  const { map } = useSelector((state: RootState) => state.maps);
  const { getRouteBetweenPoints } = useRouteBetweenPoints();

  const [activePlaceId, setActivePlaceId] = useState('');

  const onPlaceClick = (place: Feature) => {
    setActivePlaceId(place.id);
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center;

    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action list-group-item-secondary pointer ${
            place.id === activePlaceId ? 'active' : ''
          }`}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_es}</h6>
          <p
            style={{
              fontSize: '12px',
            }}
          >
            {place.place_name_es}
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};

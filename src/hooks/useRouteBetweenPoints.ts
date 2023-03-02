import { AnySourceData, LngLatBounds } from 'mapbox-gl';
import { useSelector, useDispatch } from 'react-redux';
import { directionsApi } from '../apis';
import { DirectionsResponse } from '../interfaces/directions';
import { setDistance } from '../store';
import { RootState } from '../store/store';

export const useRouteBetweenPoints = () => {
  const { map } = useSelector((state: RootState) => state.maps);
  const dispatch = useDispatch();

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms = kms / 100;

    const minutes = Math.round(duration / 60);
    dispatch(setDistance([kms, minutes]));
    console.log('distancia: ', kms, 'kms', 'Minutos: ', minutes);

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    map?.fitBounds(bounds, { padding: 200 });

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (map?.getLayer('RouteString')) {
      map?.removeLayer('RouteString');
      map?.removeSource('RouteString');
    }

    map?.addSource('RouteString', sourceData);
    map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'red',
        'line-width': 3,
      },
    });
  };

  return {
    getRouteBetweenPoints,
  };
};

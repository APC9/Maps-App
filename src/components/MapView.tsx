import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '../helpers';
import { setMap, setUserLocation, setMarkers } from '../store';
import { RootState } from '../store/store';
import { Loading } from './Loading';

export const MapView = () => {
  const { places, isLoading, userLocation } = useSelector(
    (state: RootState) => state.places
  );
  const { markers, map } = useSelector((state: RootState) => state.maps);
  const dispatch = useDispatch();

  const mapDiv = useRef<HTMLDivElement>(null);
  const myLocationPopup = new Popup().setHTML('<h3>My Location</h3>');

  useEffect(() => {
    markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
        `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .addTo(map!);

      newMarkers.push(newMarker);
    }
    dispatch(setMarkers(newMarkers));
  }, [places]);

  useEffect(() => {
    getUserLocation().then((location) => dispatch(setUserLocation(location)));
  }, []);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });
      new Marker({ color: 'red' })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);
      dispatch(setMap(map));
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
      }}
    ></div>
  );
};

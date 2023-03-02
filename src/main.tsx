import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import { Provider } from 'react-redux';

import { MapsApp } from './MapsApp';
import { store } from './store/store';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXBjOTEiLCJhIjoiY2xjMGpzZXh0MDNseTNwb2RueXp4bDB0NiJ9.UO9JYXS75G9EPZisRJL3uQ';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MapsApp />
    </Provider>
  </React.StrictMode>
);

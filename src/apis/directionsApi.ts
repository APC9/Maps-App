import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoiYXBjOTEiLCJhIjoiY2xjMGpzZXh0MDNseTNwb2RueXp4bDB0NiJ9.UO9JYXS75G9EPZisRJL3uQ',
  },
});

export default directionsApi;

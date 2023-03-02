import axios from 'axios';

const searcApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 3,
    language: 'es',
    access_token:
      'pk.eyJ1IjoiYXBjOTEiLCJhIjoiY2xjMGpzZXh0MDNseTNwb2RueXp4bDB0NiJ9.UO9JYXS75G9EPZisRJL3uQ',
  },
});

export default searcApi;

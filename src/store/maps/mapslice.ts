import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Map, Marker } from 'mapbox-gl';

interface mapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  distance?: [number, number];
}

const initialState: mapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  distance: undefined,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Map>) => {
      state.isMapReady = true;
      state.map = action.payload;
    },
    setMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.markers = action.payload;
    },
    setDistance: (state, action: PayloadAction<[number, number]>) => {
      state.distance = action.payload;
    },
    setClearDistance: (state) => {
      state.distance = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMap, setMarkers, setDistance, setClearDistance } =
  mapSlice.actions;

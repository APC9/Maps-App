import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Feature } from '../../interfaces/placesResponse';

interface placeState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const initialState: placeState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<[number, number]>) => {
      state.isLoading = false;
      state.userLocation = action.payload;
    },
    setLoadingPlaces: (state) => {
      state.isLoadingPlaces = true;
      state.places = [];
    },
    setPlaces: (state, action: PayloadAction<Feature[]>) => {
      state.isLoadingPlaces = false;
      state.places = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLocation, setLoadingPlaces, setPlaces } =
  placeSlice.actions;

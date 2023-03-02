import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { mapSlice } from './maps/mapslice';
import { placeSlice } from './places/placesSlice';

export const store = configureStore({
  reducer: {
    places: placeSlice.reducer,
    maps: mapSlice.reducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch, useSelector } from 'react-redux';
import { searcApi } from '../apis';
import { Feature, PlacesReponse } from '../interfaces/placesResponse';
import { setClearDistance, setLoadingPlaces, setPlaces } from '../store';
import { RootState } from '../store/store';

export const useSearchPlacesByTerm = () => {
  const { userLocation } = useSelector((state: RootState) => state.places);
  const dispatch = useDispatch();

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch(setPlaces([]));
      dispatch(setClearDistance());

      return [];
    }

    if (!userLocation) throw new Error('No hay ubicación del usuario');

    dispatch(setLoadingPlaces());

    const resp = await searcApi.get<PlacesReponse>(`/${query}.json`, {
      params: {
        proximity: userLocation.join(','),
      },
    });

    dispatch(setPlaces(resp.data.features));

    return resp.data.features;
  };

  return {
    searchPlacesByTerm,
  };
};

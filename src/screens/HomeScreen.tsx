import { useSelector } from 'react-redux';
import {
  BtnMyLocation,
  DistanceCard,
  MapView,
  ReactLogo,
  SearchBar,
} from '../components';
import { RootState } from '../store/store';

export const HomeScreen = () => {
  const { distance } = useSelector((state: RootState) => state.maps);
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
      <SearchBar />
      {distance !== undefined ? <DistanceCard /> : <></>}
    </div>
  );
};

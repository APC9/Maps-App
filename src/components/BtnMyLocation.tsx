import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const BtnMyLocation = () => {
  const { userLocation } = useSelector((state: RootState) => state.places);
  const { isMapReady, map } = useSelector((state: RootState) => state.maps);

  const onClick = () => {
    if (!isMapReady) throw new Error('Mapa no esta cargado');
    if (!userLocation) throw new Error('No hay ubicación del usuario');
    map?.flyTo({
      center: userLocation,
      zoom: 15,
    });
  };

  return (
    <button
      className="btn btn-primary"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '999',
      }}
      onClick={onClick}
    >
      Mi Ubicación
    </button>
  );
};

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const DistanceCard = () => {
  const { distance } = useSelector((state: RootState) => state.maps);

  return (
    <div
      className="card w-20"
      style={{
        position: 'fixed',
        bottom: '150px',
        right: '20px',
        zIndex: '999',
      }}
    >
      <div className="card-body">
        <h5 className="card-title">Ruta</h5>
        <p className="card-text">{`kilometros: ${
          distance ? distance[0] : ''
        } Kms`}</p>
        <p className="card-text">{`Tiempo : ${
          distance ? distance[1] : ''
        } Mins`}</p>
      </div>
    </div>
  );
};

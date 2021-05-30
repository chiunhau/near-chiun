import { useContext } from 'react';
import nearContext from '../contexts/nearContext';

const useNear = () => useContext(nearContext);

export default useNear;

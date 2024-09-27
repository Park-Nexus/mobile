import {useEffect} from 'react';
import {LoadingScreen} from '../LoadingScreen';
import {useAuthStore} from '@src/states';
import {useData} from './index.data';

interface IProfileGuardProps {
  children: React.ReactNode;
}

export function ProfileGuard({children}: IProfileGuardProps) {
  const {isFetching, data} = useData();
  const {setIsAuthenticated} = useAuthStore();

  useEffect(() => {
    if (data) setIsAuthenticated(true);
  }, [data, setIsAuthenticated]);

  if (isFetching) return <LoadingScreen />;
  return children;
}

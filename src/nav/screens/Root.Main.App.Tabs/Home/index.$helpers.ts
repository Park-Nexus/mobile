import Geolocation from '@react-native-community/geolocation';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import {useCallback, useEffect, useState} from 'react';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<Position | undefined>();
  const [locationWatchId, setLocationWatchId] = useState<number | undefined>();

  const watchUserLocation = useCallback(() => {
    if (locationWatchId) return;
    const id = Geolocation.watchPosition(
      ({coords: {longitude, latitude}}) => setUserLocation([longitude, latitude]),
      () => setLocationWatchId(undefined),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
    setLocationWatchId(id);
  }, [locationWatchId]);
  const stopWatchingUserLocation = useCallback(() => {
    if (locationWatchId) {
      Geolocation.clearWatch(locationWatchId);
      setLocationWatchId(undefined);
    }
  }, [locationWatchId]);

  useEffect(() => {
    watchUserLocation();
    return () => {
      if (locationWatchId) Geolocation.clearWatch(locationWatchId);
    };
  }, []);

  return {userLocation, watchUserLocation, stopWatchingUserLocation};
}

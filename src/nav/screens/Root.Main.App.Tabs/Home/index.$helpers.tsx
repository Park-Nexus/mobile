import Geolocation from '@react-native-community/geolocation';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import {useCallback, useEffect, useState} from 'react';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<Position | undefined>();
  const [locationWatchId, setLocationWatchId] = useState<number | undefined>();

  const watchUserLocation = useCallback(() => {
    if (locationWatchId) return;
    const id = Geolocation.watchPosition(
      position => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      error => console.log('Error watching user location', error),
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

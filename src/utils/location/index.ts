import Geolocation from '@react-native-community/geolocation';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import {useCallback, useEffect, useState} from 'react';
import {TFeatureCollection, TLocationSuggestion} from './index.types';
import axios from 'axios';
import {MapTypes} from '@src/types/types.map';
import {useDebounce} from '../debounce';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<Position | undefined>();
  const [locationWatchId, setLocationWatchId] = useState<number | undefined>();

  const watchUserLocation = useCallback(() => {
    if (locationWatchId) return;
    const id = Geolocation.watchPosition(
      ({coords: {longitude, latitude}}) => setUserLocation([longitude, latitude]),
      error => console.error(error),
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

export function useSearchLocation({userLocation}: {userLocation: {lat?: number; lon?: number}}) {
  const {lat, lon} = userLocation;
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TLocationSuggestion[]>([]);
  const debouncedQuery = useDebounce<string>(query, 300);

  const searchLocation = useCallback(async () => {
    if (!debouncedQuery.trim()) return setSuggestions([]);
    const payload = encodeURIComponent(debouncedQuery);
    const endpoint = `${MapTypes.MAPBOX_GEOCODE_API}/forward?q=${payload}&proximity=${lon || 0},${
      lat || 0
    }&access_token=${MapTypes.MAPBOX_PUBLIC_ACCESS_TOKEN}`;

    const response = await axios.get(endpoint);
    const data = response.data as TFeatureCollection;

    const suggestions: TLocationSuggestion[] = data.features.map(feature => ({
      address: feature.properties.full_address,
      lat: feature.properties.coordinates.latitude,
      lon: feature.properties.coordinates.longitude,
    }));
    setSuggestions(suggestions);
  }, [debouncedQuery, lat, lon]);

  useEffect(() => {
    searchLocation();
  }, [debouncedQuery]);

  return {query, setQuery, suggestions};
}

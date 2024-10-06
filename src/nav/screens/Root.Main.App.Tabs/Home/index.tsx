import {Text, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {useCallback, useRef} from 'react';
import {CameraRef} from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import {Button} from '@src/components/Button';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import {MapTypes} from '@src/types/types.map';
import {SearchBar} from './Home.SearchBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserLocation} from './index.$helpers';

Mapbox.setAccessToken(MapTypes.MAPBOX_ACCESS_TOKEN);

export function Home() {
  const {userLocation, watchUserLocation, stopWatchingUserLocation} = useUserLocation();
  const cameraRef = useRef<CameraRef>(null);

  const {bottom} = useSafeAreaInsets();

  const zoomToCurrentLocation = useCallback(() => {
    watchUserLocation();
    if (cameraRef.current && userLocation) {
      cameraRef.current.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000,
        animationMode: 'flyTo',
      });
    }
  }, [cameraRef, userLocation, watchUserLocation]);

  const calculateDistance = (coord1: Position, coord2: Position) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRad(coord1[1]);
    const lat2 = toRad(coord2[1]);
    const deltaLat = toRad(coord2[1] - coord1[1]);
    const deltaLon = toRad(coord2[0] - coord1[0]);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  };

  return (
    <View style={{flex: 1}}>
      <SearchBar />
      <Mapbox.MapView
        style={{flex: 1}}
        logoEnabled={false}
        scaleBarEnabled={false}
        compassEnabled
        compassFadeWhenNorth
        onCameraChanged={event => {
          if (event.gestures.isGestureActive) stopWatchingUserLocation();
        }}
        compassPosition={{bottom: bottom + 50, left: 20}}>
        <Mapbox.Camera centerCoordinate={userLocation} ref={cameraRef} zoomLevel={14} animationDuration={3500} />

        <Mapbox.Images>
          <Mapbox.Image name="userLocationImage">
            <View
              style={{
                backgroundColor: '#128085',
                width: 16,
                height: 16,
                borderRadius: 16,
              }}
            />
          </Mapbox.Image>
        </Mapbox.Images>

        <Mapbox.LocationPuck
          topImage="userLocationImage"
          pulsing={{
            color: '#128085',
          }}
        />

        <Mapbox.PointAnnotation id="new-point" coordinate={[105.794, 21.035]}>
          <View style={{backgroundColor: '#128085', padding: 5, borderRadius: 5}}>
            <Text style={{color: '#fff'}}>Hello World!</Text>
          </View>
        </Mapbox.PointAnnotation>

        <Mapbox.PointAnnotation
          id="new-point-2"
          coordinate={[105.794, 21.04]}
          onSelected={() => console.log('Hello World 2 selected')}>
          <View style={{backgroundColor: '#128085', padding: 5, borderRadius: 5}}>
            <Text style={{color: '#fff'}}>Hello World 2</Text>
          </View>
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>

      <Button
        variant="green"
        text="Test"
        onPress={zoomToCurrentLocation}
        style={{position: 'absolute', bottom: 120, right: 20}}
      />
    </View>
  );
}

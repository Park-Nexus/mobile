import {Text, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {useCallback, useRef} from 'react';
import {CameraRef} from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import {Button} from '@src/components/Button';
import {MapTypes} from '@src/types/types.map';
import {SearchBar} from './Home.SearchBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserLocation} from './index.$helpers';
import {useParkingLots} from './index.$data';
import {useHomeContext} from './index.$context';

Mapbox.setAccessToken(MapTypes.MAPBOX_ACCESS_TOKEN);

export function Map() {
  const {userLocation, watchUserLocation, stopWatchingUserLocation} = useUserLocation();
  const cameraRef = useRef<CameraRef>(null);
  const {parkingLots} = useParkingLots();
  const {setSelectedLotId} = useHomeContext();

  const {bottom} = useSafeAreaInsets();

  const zoomToCurrentLocation = useCallback(() => {
    watchUserLocation();
    if (cameraRef.current && userLocation) {
      cameraRef.current.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 15,
        animationDuration: 2000,
        animationMode: 'flyTo',
      });
    }
  }, [cameraRef, userLocation, watchUserLocation]);

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
        <Mapbox.Camera centerCoordinate={userLocation} ref={cameraRef} zoomLevel={15} animationDuration={3000} />

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

        {parkingLots.map(({id, latitude, longitude, name}) => (
          <Mapbox.PointAnnotation
            key={id.toString()}
            id={id.toString()}
            coordinate={[longitude, latitude]}
            onSelected={() => setSelectedLotId(id)}>
            <View style={{backgroundColor: '#128085', padding: 5, borderRadius: 5}}>
              <Text style={{color: '#fff'}}>{name}</Text>
            </View>
          </Mapbox.PointAnnotation>
        ))}
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

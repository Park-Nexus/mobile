import {Text, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {useRef} from 'react';
import {CameraRef} from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import {Button} from '@src/components/Button';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';

Mapbox.setAccessToken(
  'sk.eyJ1IjoidmNsb25nMjAwMyIsImEiOiJjbTFuOHU0MW8wb2QzMmtxdGt4NGE0NDJ4In0.R6WnMSJimChYG0A6PAA5_Q',
);

export function Home() {
  const userLocation: Position = [105.790228, 21.030232];
  const cameraRef = useRef<CameraRef>(null);

  const zoomToCurrentLocation = () => {
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: userLocation,
        zoomLevel: 14,
        animationDuration: 2000,
        animationMode: 'flyTo',
      });
    }
  };

  const calculateDistance = (coord1: Position, coord2: Position) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRad(coord1[1]);
    const lat2 = toRad(coord2[1]);
    const deltaLat = toRad(coord2[1] - coord1[1]);
    const deltaLon = toRad(coord2[0] - coord1[0]);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  };

  return (
    <View style={{flex: 1, backgroundColor: '#58b5bb'}}>
      <Mapbox.MapView
        style={{flex: 1}}
        logoEnabled={false}
        scaleBarEnabled={false}
        tintColor={'#128085'}>
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={14}
          centerCoordinate={userLocation}
          animationDuration={3500}
        />
        <Mapbox.LocationPuck
          pulsing={{
            color: '#128085',
          }}
        />

        <Mapbox.PointAnnotation id="new-point" coordinate={[105.794, 21.035]}>
          <View
            style={{backgroundColor: '#128085', padding: 5, borderRadius: 5}}>
            <Text style={{color: '#fff'}}>Hello World!</Text>
          </View>
        </Mapbox.PointAnnotation>
        <Mapbox.PointAnnotation
          id="new-point-2"
          style={{backgroundColor: '#128085', padding: 5, borderRadius: 5}}
          coordinate={[105.794, 21.04]}
          onSelected={() => console.log('Hello World 2 selected')}>
          <Text style={{color: '#fff'}}>Hello World 2</Text>
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
      <Button
        variant="green"
        text="Test"
        onPress={zoomToCurrentLocation}
        style={{position: 'absolute', top: 50, right: 20}}
      />
    </View>
  );
}

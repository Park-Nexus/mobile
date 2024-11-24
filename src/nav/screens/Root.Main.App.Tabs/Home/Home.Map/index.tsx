import React from "react";
import {Keyboard, View} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {useCallback, useEffect, useRef} from "react";
import {CameraRef} from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import {Button} from "@src/components/Button";
import {MapTypes} from "@src/types/types.map";
import {SearchBar} from "../Home.SearchBar";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useParkingLots} from "../index.$data";
import {useHomeContext} from "../index.$context";
import {useUserLocation} from "@src/utils/location";
import {styles} from "./index.styles";

import CurrentLocationSvg from "@src/static/svgs/CurrentLocation.svg";
import MapPinSvg from "@src/static/svgs/MapPin.svg";

Mapbox.setAccessToken(MapTypes.MAPBOX_ACCESS_TOKEN);
export function Map() {
    const {userLocation, watchUserLocation, stopWatchingUserLocation} = useUserLocation();

    const cameraRef = useRef<CameraRef>(null);
    const {parkingLots} = useParkingLots();
    const {setSelectedLotId, selectedLocation, setSelectedLocation, setUserLocation} = useHomeContext();

    const {bottom} = useSafeAreaInsets();

    const zoomToCurrentLocation = useCallback(() => {
        setSelectedLocation(undefined);
        watchUserLocation();
        if (cameraRef.current && userLocation) {
            cameraRef.current.setCamera({
                centerCoordinate: userLocation,
                zoomLevel: 15,
                animationDuration: 2000,
                animationMode: "flyTo",
            });
        }
    }, [cameraRef, userLocation, watchUserLocation]);

    const zoomToSelectedLocation = useCallback(() => {
        if (!selectedLocation) return;
        stopWatchingUserLocation();
        if (cameraRef.current) {
            cameraRef.current.setCamera({
                centerCoordinate: [selectedLocation.lon, selectedLocation.lat],
                zoomLevel: 15,
                animationDuration: 2000,
                animationMode: "flyTo",
            });
        }
    }, [cameraRef, selectedLocation]);

    useEffect(() => {
        setUserLocation({lat: userLocation?.[1], lon: userLocation?.[0]});
    }, [userLocation]);

    useEffect(() => {
        if (!selectedLocation) return;
        zoomToSelectedLocation();
    }, [selectedLocation]);

    return (
        <View style={styles.wrapper}>
            <SearchBar userLocation={{lat: userLocation?.[1], lon: userLocation?.[0]}} />
            <Mapbox.MapView
                onTouchStart={Keyboard.dismiss}
                style={{flex: 1}}
                logoEnabled={false}
                scaleBarEnabled={false}
                attributionEnabled={false}
                compassEnabled
                compassFadeWhenNorth
                onCameraChanged={event => {
                    if (event.gestures.isGestureActive) stopWatchingUserLocation();
                }}
                compassPosition={{bottom: bottom + 100, left: 20}}>
                <Mapbox.Camera
                    centerCoordinate={userLocation}
                    ref={cameraRef}
                    zoomLevel={15}
                    animationDuration={3000}
                />

                {/* User location ------------------------------------------------ */}
                <Mapbox.Images>
                    <Mapbox.Image name="userLocationImage">
                        <View style={styles.userLocation} />
                    </Mapbox.Image>
                </Mapbox.Images>
                <Mapbox.LocationPuck topImage="userLocationImage" pulsing={{color: "#128085"}} />

                {parkingLots.map(({id, latitude, longitude}) => (
                    <Mapbox.PointAnnotation
                        key={id.toString()}
                        id={id.toString()}
                        coordinate={[longitude, latitude]}
                        onSelected={() => setSelectedLotId(id)}>
                        <MapPinSvg width={35} height={35} />
                    </Mapbox.PointAnnotation>
                ))}
            </Mapbox.MapView>

            {/* Zoom to current ------------------------------------------------ */}
            <Button
                variant="green"
                preIcon={<CurrentLocationSvg width={24} height={24} />}
                onPress={zoomToCurrentLocation}
                style={styles.zoomBtn}
            />
        </View>
    );
}

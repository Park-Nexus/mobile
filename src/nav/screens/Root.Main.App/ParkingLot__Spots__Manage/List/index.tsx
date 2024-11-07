import {useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMyParkingLotDetail} from './index.data';
import {useSpotManagerContext} from '../index.context';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '@src/components/Button';
import {useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AddParkingSpotSheet} from '../Sheet/Sheet.Add';
import {UpdateParkingSpotSheet} from '../Sheet/Sheet.Update';
import {ParkingSpot} from '@parknexus/api/prisma/client';

export function List() {
    const navigation = useNavigation();
    const {lotId, selectedSpot, setSelectedSpot} = useSpotManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    const addSheetRef = useRef<BottomSheetModal>(null);
    const updateSheetRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (!!selectedSpot) {
            updateSheetRef.current?.present();
        }
    }, [selectedSpot, lotId]);

    return (
        <SafeAreaView>
            <Header title="Parking spots" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'teal'}}>
                    {lot?.parkingSpots.map(spot => (
                        <TouchableOpacity
                            onPress={() => setSelectedSpot(spot)}
                            key={spot.id}
                            style={{width: 100, height: 100}}>
                            <Text>
                                {spot.name} - {spot.isAvailable ? 'Available' : 'Not Available'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{width: 100, height: 100}}>
                        <Button variant="gray" text="Add" onPress={() => addSheetRef.current?.present()} />
                    </View>
                </View>
            </ScrollView>
            <AddParkingSpotSheet ref={addSheetRef} onClose={() => addSheetRef.current?.dismiss()} />
            {!!selectedSpot && (
                <UpdateParkingSpotSheet ref={updateSheetRef} onClose={() => updateSheetRef.current?.dismiss()} />
            )}
        </SafeAreaView>
    );
}

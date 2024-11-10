import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useCameraDevice, Camera, useCameraPermission, CodeScannerFrame} from 'react-native-vision-camera';

type TCheckInSheetProps = {
    onClose: () => void;
};
export const CheckInSheet = forwardRef<BottomSheetModal, TCheckInSheetProps>(({onClose}, ref) => {
    const device = useCameraDevice('back');
    const {hasPermission} = useCameraPermission();
    const [isCameraActive, setIsCameraActive] = useState(false);

    if (!device || !hasPermission) return null;
    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['80%']}
            backgroundStyle={{backgroundColor: '#f6f6f6'}}
            enableDismissOnClose>
            <BottomSheetView>
                <Text>CheckInSheet</Text>
                <View style={{borderRadius: 16, overflow: 'hidden', width: 250, height: 250}}>
                    <Camera
                        device={device}
                        isActive={isCameraActive}
                        style={{width: 250, height: 250}}
                        resizeMode="cover"
                        codeScanner={{
                            codeTypes: ['qr'],
                            regionOfInterest: {x: 0, y: (1920 - 1080) / 2 / 1920, width: 1, height: 1080 / 1920},
                            onCodeScanned: codes => {
                                console.log(codes[0]?.value);
                                setIsCameraActive(false);
                                onClose();
                            },
                        }}
                        onInitialized={() => setIsCameraActive(true)}
                    />
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

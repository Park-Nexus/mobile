import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {ScrollView, Text, View} from 'react-native';

import ListBulletSvg from '@src/static/svgs/ListBullet.svg';
import {styles} from './index.styles';
import FastImage from 'react-native-fast-image';
import {Button} from '@src/components/Button';

import AvatarPlaceHolder from '@src/static/images/Profile.png';
import CaretRightBlackSvg from '@src/static/svgs/CaretRightBlack.svg';
import {useMe} from './index.data';
import {useAuthStore} from '@src/states';
import {AuthStorage} from '@src/auth/auth.utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

export function Settings() {
    const {me} = useMe();
    const {setIsAuthenticated} = useAuthStore();
    const {navigate} = useNavigation<NavigationProp<AppStackParamList>>();

    const logout = async () => {
        await AuthStorage.clearAuthStorage();
        setIsAuthenticated(false);
    };

    return (
        <SafeAreaView>
            <Header title="Settings" rightButtonIcon={<ListBulletSvg width={24} height={24} />} />
            <View style={styles.wrapper}>
                <Text style={styles.sectionTitle}>Account</Text>
                <View style={{height: 8}} />
                <View style={styles.accountWrapper}>
                    <FastImage
                        source={me?.avatarUrl ? {uri: me?.avatarUrl} : AvatarPlaceHolder}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <View style={styles.accountTextsWrapper}>
                        <Text style={styles.userNameText}>
                            {me?.firstName} {me?.lastName}
                        </Text>
                        <Text style={styles.userInfoText}>{me?.account?.email}</Text>
                    </View>
                    <Button
                        variant="gray"
                        preIcon={<CaretRightBlackSvg width={16} height={16} />}
                        style={styles.button}
                    />
                </View>
                <View style={{height: 32}} />
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={{height: 8}} />
                <ScrollView style={styles.settingListWrapper}>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingItemText}>My Vehicles</Text>
                        <Button
                            variant="gray"
                            preIcon={<CaretRightBlackSvg width={16} height={16} />}
                            style={styles.button}
                            onPress={() => navigate('Settings__Vehicle_List')}
                        />
                    </View>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingItemText}>Notification</Text>
                        <Button
                            variant="gray"
                            preIcon={<CaretRightBlackSvg width={16} height={16} />}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </View>
            <Button variant="gray" text="Log out" style={styles.logoutButton} onPress={logout} />
        </SafeAreaView>
    );
}

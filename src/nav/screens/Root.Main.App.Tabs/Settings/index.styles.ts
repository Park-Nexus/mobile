import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 16,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },

    button: {
        width: 36,
        height: 36,
    },

    accountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 55 / 2,
    },
    accountTextsWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
        gap: 6,
    },
    userNameText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#128085',
    },
    userInfoText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000',
    },

    settingListWrapper: {
        flexDirection: 'column',
        flex: 1,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: '#F6F6F6',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 8,
        marginBottom: 8,
    },
    settingItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },

    logoutButton: {
        position: 'absolute',
        bottom: 120,
        left: 16,
        right: 16,
    },
});

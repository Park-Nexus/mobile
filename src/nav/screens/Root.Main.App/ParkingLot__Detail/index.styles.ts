import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 32,
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 16,
    },

    infoWrapper: {
        gap: 16,
    },
    textWrapper: {
        gap: 4,
    },
    nameText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    addressText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#5A5555',
    },
});

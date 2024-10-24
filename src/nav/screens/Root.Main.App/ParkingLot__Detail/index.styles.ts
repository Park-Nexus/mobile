import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 32,
    },

    imageWrapper: {
        marginHorizontal: 20,
        borderRadius: 16,
        overflow: 'hidden',
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
    pillsWrapper: {
        flexDirection: 'row',
        gap: 8,
    },
    pill: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: '#128085',
        borderRadius: 99,
        borderWidth: 1,
    },
    pillText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#662400',
    },
    infoButtonsWrapper: {
        flexDirection: 'row',
        gap: 8,
    },
    infoButtonText: {
        color: '#128085',
    },

    servicesWrapper: {
        gap: 16,
    },
    serviceTitleText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    serviceItemsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceItem: {
        flexDirection: 'column',
        width: 50,
        gap: 8,
    },
    serviceItemText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#5A5555',
    },
});

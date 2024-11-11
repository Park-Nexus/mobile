import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    selectImageButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#888',
    },
    formSection: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    submitButton: {
        marginBottom: 32,
    },
});

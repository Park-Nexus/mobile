import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    imageContainer: {
        flexDirection: "row",
        marginBottom: 20,
        minHeight: 100,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },

    formSection: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    submitButton: {
        marginBottom: 32,
    },
});

import { Pressable, StyleSheet, Text } from "react-native";


export default function ButtonFilter ({
    buttonText, onPress, active
}) {
    return (
        <Pressable
            style={[
                styles.buttonContainer,
                active && styles.buttonFilterActive,
            ]}
            onPress={onPress}
        >
            <Text style={[
                styles.buttonFilterText,
                active && styles.buttonFilterTextActive,
            ]}>
                {buttonText}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
    buttonFilterActive: {
        backgroundColor: '#41A48F',
    },
    buttonFilterText: {
        color: '#555',
        textAlign: 'center'
    },
    buttonFilterTextActive: {
        color: 'white',
    },
})
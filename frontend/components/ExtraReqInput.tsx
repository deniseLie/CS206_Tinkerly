import { View, Text, TextInput, StyleSheet } from 'react-native';

const ExtraReqInput = (extraRequests, setExtraRequests) => {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Extra Requests (Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your extra requests..."
                value={extraRequests}
                onChangeText={setExtraRequests}
                numberOfLines={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#FFF',
    },
});

export default ExtraReqInput;

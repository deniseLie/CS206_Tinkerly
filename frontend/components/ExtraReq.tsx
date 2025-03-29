import { Platform, StyleSheet, View, Text } from "react-native";

export default function ExtraReq ({ description }) {
    return (
        <View style={styles.descriptionCard}>
            <Text style={styles.descriptionTitle}>Extra Requirements</Text>
            <Text style={styles.descriptionText}>
              {description && description }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    descriptionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === 'android' ? 3 : undefined,
      },
      descriptionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      descriptionText: {
        lineHeight: 20,
        color: '#333',
      },
})
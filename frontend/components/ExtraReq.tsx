import { Platform, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


export default function ExtraReq ({ description }) {
    return (
        <ThemedView style={styles.descriptionCard}>
            <ThemedText style={styles.descriptionTitle}>Extra Requirements</ThemedText>
            <ThemedText style={styles.descriptionText}>
              {description && description }
            </ThemedText>
        </ThemedView>
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
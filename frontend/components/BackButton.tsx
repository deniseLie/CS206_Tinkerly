import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router"

export default function BackButton ({ text, noMargin = false }) {
    const router = useRouter();
    return (
        <Pressable 
            style={[styles.backButton, noMargin && { marginLeft: 0 }]} 
            onPress={() => router.back()}
        >
            <FontAwesome name="arrow-left" size={20} color="#41A48F" />
            {text && (
                <Text style={styles.text}>{text}</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#41A48F',
        marginLeft: 20
    }
})
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function BackButton({ text, noMargin = false, isHomeButton = false }) {
    const router = useRouter();

    const handlePress = () => {
        router.back(); // Go back to the previous screen
    };

    const handleHomePress = () => {
        router.push('/'); // Navigate to home screen
    }

    return (
        <View>
            {text && (
                <Pressable
                    style={[styles.backButton, noMargin && { marginLeft: 0 }]}
                    onPress={handlePress}
                >
                    <FontAwesome name="chevron-left" size={20} color="#41A48F" />
                    <Text style={styles.text}>{text}</Text>
                </Pressable>
            )}
            {isHomeButton && (
                <Pressable
                    style={[styles.homeButton]}
                    onPress={handleHomePress}
                >
                    <Text style={[styles.text, { marginLeft: 10 }]}>Home</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    homeButton: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#41A48F',
        marginLeft: 20,
    },
});

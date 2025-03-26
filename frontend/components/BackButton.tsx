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
            <Pressable
                style={[styles.backButton, noMargin && { marginLeft: 0 }]}
                onPress={handlePress}
            >
                <FontAwesome name="arrow-left" size={20} color="#41A48F" />
                {text && (
                    <Text style={styles.text}>{text}</Text>
                )}

                {isHomeButton && (
                    <Pressable
                        style={[styles.homeButton]}
                        onPress={handleHomePress}
                    >
                        <Text style={[styles.text, { marginLeft: 10 }]}>Home</Text>
                    </Pressable>
                )}
            </Pressable>
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

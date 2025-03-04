import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

type Service = {
    name: string;
    service: string;
    price: number;
};

export default function ReviewPage() {
    const { service } = useLocalSearchParams();
    const parsedService: Service | null = service ? JSON.parse(service as string) : null;
    const router = useRouter();

    // State
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<string>("");

    // Handle Rating
    const handleRating = (index: number) => setRating(index);

    // Handle Submit
    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert("Please provide a rating.");
            return;
        }
        Alert.alert("Review Submitted", "Thank you for your feedback!");
        router.back();
    };

    // Handle Service Not Up to Standard
    const handleNotUpToStandard = () => {
        Alert.alert(
            "Report Issue",
            "We're sorry to hear that! A support representative will contact you soon.",
        );
        router.back();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Back Button */}
            <BackButton text="Back"/>

            {/* Service Details */}
            <View style={styles.card}>
                <Text style={styles.name}>{parsedService?.name || "Service Provider"}</Text>
                <Text style={styles.service}>{parsedService?.service || "Service Type"}</Text>
                <Text style={styles.price}>Price: {parsedService?.price || 50} SGD</Text>
            </View>

            {/* Rating Section */}
            <Text style={styles.sectionTitle}>Rate the Service</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <Pressable key={index} onPress={() => handleRating(index)}>
                        <FontAwesome
                            name="star"
                            size={32}
                            color={index <= rating ? "#fabb05" : "#ccc"}
                            style={styles.star}
                        />
                    </Pressable>
                ))}
            </View>

            {/* Additional Comments */}
            <Text style={styles.sectionTitle}>Additional Comments</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Share your experience..."
                value={comments}
                onChangeText={setComments}
                multiline
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.confirmButton]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Confirm Completion</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.issueButton]}
                    onPress={handleNotUpToStandard}
                >
                    <Text style={styles.buttonText}>Not satisfied</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    card: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    service: {
        fontSize: 16,
        color: "gray",
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
        color: "#41A48F",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 5,
    },
    textInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: "top",
        minHeight: 100,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    confirmButton: {
        backgroundColor: "#41A48F",
    },
    issueButton: {
        backgroundColor: "#E74C3C",
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});

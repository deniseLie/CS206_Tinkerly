import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView, Modal, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { createServiceReview } from "@/services/serviceReviewApi";

export default function ReviewPage() {
    const { data = null } = useLocalSearchParams();
    const parsedService = data ? JSON.parse(data) : null;
    const router = useRouter();

    // State
    const [rating, setRating] = useState<number>(0);
    const [comments, setComments] = useState<string>("");

    const [issueComment, setIssueComment] = useState<string>(""); // state to store the issue comment
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false); // for loading state

    // Handle Rating
    const handleRating = (index: number) => setRating(index);

    // Handle Submit
    const handleSubmit = async () => {
        if (rating === 0) return Alert.alert("Error", "Please provide a rating.");

        setLoading(true);
        console.log('sericese', parsedService)
        try {
            const reviewData = {
                rating,
                comments,
                serviceID: parsedService?.service?.serviceID || "", // Assuming serviceID is passed in `parsedService`
            };

            const response = await createServiceReview(reviewData);
            console.log('handle rating', response);

            // If successful, show a success message and redirect to the home page
            Alert.alert("Success", "Your review has been submitted successfully.", [
                { text: "OK", onPress: () => router.push("/") }, // Redirect to home page
            ]);
        } catch (e) {
            console.log("Error submitting review:", e);
            Alert.alert("Error", "There was an issue submitting your review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle when the user clicks "Not satisfied"
    const handleNotUpToStandard = () => {
        setIsModalVisible(true); // Show the modal to input the issue comment
    };

    // Handle submitting the issue comment
    const handleSubmitIssue = () => {
        if (issueComment.trim()) {
            // Submit the issue (for now we just log it and show an alert)
            console.log("Issue Comment: ", issueComment);

            // Display a success alert and redirect to the home page
            Alert.alert(
                "Thank You",
                "We're sorry to hear that! A support representative will contact you soon.",
                [{ text: "OK", onPress: () => router.push("/") }]
            );
        } else {
            Alert.alert("Error", "Please provide a description before submitting.");
        }

        // Hide the modal
        setIsModalVisible(false);
    };

    // Close the modal without submitting
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Back Button */}
            <BackButton text="Back" noMargin={true} />

            {/* Service Details */}
            <View style={styles.card}>
                <Text style={styles.name}>{parsedService?.name || "Service Provider"}</Text>
                <Text style={styles.service}>{parsedService?.category || "Service Type"}</Text>
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
                <Pressable
                    style={[styles.button, styles.issueButton]}
                    onPress={handleNotUpToStandard}
                >
                    <Text style={styles.buttonText}>Not satisfied</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <Text style={styles.buttonText}>Submitting...</Text>
                    ) : (
                        <Text style={styles.buttonText}>Leave Review</Text>
                    )}
                </Pressable>
            </View>

            {/* Modal for issue reporting */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Report Issue</Text>
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Describe the issue..."
                            value={issueComment}
                            onChangeText={setIssueComment}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" onPress={handleCloseModal} />
                            <Button title="Submit" onPress={handleSubmitIssue} />
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalTextInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: "top",
        minHeight: 100,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});


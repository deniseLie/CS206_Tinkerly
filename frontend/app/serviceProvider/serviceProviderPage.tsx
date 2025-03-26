import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Share } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Divider from '@/components/divider';
import BackButton from '@/components/BackButton';
import CalendarPrice from '@/components/calendarPrice';

export default function ServiceProviderPage ({}) {

    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;

    const router = useRouter();
    const [selectedDateTime, setSelectedDate] = useState<Date | null>(null);
    const [isCalendarVisible, setCalendarVisible] = useState(false);

    const [availableTimes] = useState({
        "Monday": "2-3 PM",
        "Wednesday": "4-5 PM" 
    });

    const [availableDates] = useState({
        "2025-03-10" : { price: "50 SGD" },
        "2025-03-15": { price: "60 SGD" },
    });

    const reviews = [
        { id: "1", name: "John Doe", rating: 5, comment: "Great service! Highly recommend." },
        { id: "2", name: "Jane Smith", rating: 4, comment: "Very professional and on time!" },
        { id: "3", name: "Mike Johnson", rating: 3, comment: "Good service, but could improve punctuality." },
    ];

    // Share handler
    const handleShare = async (date) => {
        try {
            await Share.share({
                message: `Check out ${data?.service?.category} for ${data?.service?.category} services!`,
            });
        } catch (error) {
            Alert.alert('Error', 'Unable to share at the moment.');
        }
    };

    // Booking handler - send data to backend
    const handleBook = async () => {
        if (!selectedDateTime) {
            Alert.alert('Error', 'Please select a date before booking.');
            return;
        }

        // Mock API request for booking
        const bookingData = {
            description: parsedData?.service?.category,
            date: selectedDateTime,
            price: availableDates[selectedDateTime]?.price,
            providerId: parsedData?.provider?.id,
            userId: "user123", // Assuming you have a user ID
        };

        try {
            // Example: sending the booking data to the backend (boilerplate)
            const response = await fetch('https://your-api-url.com/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to book provider');
            }

            Alert.alert('Success', 'Booking successfully made!');
            router.push('/booking/confirmation'); // Assuming you have a confirmation page

        } catch (error) {
            Alert.alert('Error', 'There was an issue booking the provider. Please try again later.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Back Button */}
            <BackButton text={"Back"} noMargin={true} />

            {/* Service Provider Info */}
            <View style={styles.card}>
                <Text style={styles.name}>{parsedData?.provider?.name || "Ah Beng"}</Text>
                <Text style={styles.service}>{parsedData?.service?.category || "Aircon Service"}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={18} color="gray" />
                    <Text style={styles.location}>{parsedData?.provider?.distance}</Text>
                </View>
                <Text style={styles.price}>Starting from {parsedData?.provider?.price || 50} SGD</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.bookButton]} onPress={() => setCalendarVisible(true)}>
                    <Text style={styles.buttonText}>Book Provider</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.shareButton]} onPress={handleShare}>
                    <FontAwesome name="share" size={20} color="white" />
                    <Text style={styles.buttonText}>Share</Text>
                </Pressable>
            </View>

            {/* Divider */}
            <Divider customStyle={styles.divider} />

            {/* Show Calendar only when "Book Provider" button is pressed */}
            {isCalendarVisible && (
                <View>
                    <Text style={styles.sectionTitle}>Select Available Date</Text>
                    <CalendarPrice
                        selectedDate={availableDates}
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                    />

                    {/* Divider */}
                    <Divider customStyle={styles.divider} />
                </View>
            )}

            {selectedDateTime && availableDates[selectedDateTime] && (
                <Text style={styles.price}>Price: {availableDates[selectedDateTime].price}</Text>
            )}

            {/* Rating and Reviews */}
            <View style={[styles.reviewHeader, {"marginBottom": 10}]}>
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
                <Text style={styles.reviewText}>({parsedData?.provider?.reviews})</Text>
                <FontAwesome name="star" size={18} color="#fabb05" />
            </View>
            <View style={styles.ratingContainer}>
                {reviews?.map((review, index) => (
                    <View style={styles.reviewCard} key={index}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewName}>{review.name}</Text>
                            <View style={styles.reviewRating}>
                                <Text style={styles.reviewText}> {review.rating}</Text>
                                <FontAwesome name="star" size={16} color="#fabb05" />
                            </View>
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                ))}
                <Text style={styles.rating}>{parsedData?.provider?.rating}</Text>
            </View>

            {/* Book Button - Submit booking */}
            {isCalendarVisible && selectedDateTime && (
                <Pressable style={[styles.button, styles.bookButton, {marginBottom: 50}]} onPress={handleBook}>
                    <Text style={styles.buttonText}>Confirm Booking</Text>
                </Pressable>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "white",
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    service: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    location: {
        marginLeft: 5,
        color: 'gray',
    },
    ratingContainer: {
        marginVertical: 5,
    },
    divider: {
        marginVertical: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        color: '#41A48F',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeslot: {
        fontSize: 16,
        color: '#555', 
        marginBottom: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    shareButton: {
        backgroundColor: '#4CAF50',
    },
    bookButton: {
        backgroundColor: '#41A48F',
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
        fontWeight: '600',
    },
    reviewCard: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    reviewName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    reviewRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewComment: {
        fontSize: 14,
        color: "#555",
    },
});

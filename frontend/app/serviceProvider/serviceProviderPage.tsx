import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Share } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Divider from '@/components/divider';
import BackButton from '@/components/BackButton';
import CalendarPrice from '@/components/calendarPrice';

export default function ServiceProviderPage ({}) {

    const { service, selectedDateTime = null } = useLocalSearchParams();
    const parsedService = service ? JSON.parse(service) : null;

    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [availableTimes] = useState({
        "Monday": "2-3 PM",
        "Wednesday": "4-5 PM" 
    });

    const [availableDates] = useState({
        "2025-03-10" : { price: "50 SGD" },
        "2025-03-15": { price: "60 SGD" },
    })

    const reviews = [
        { id: "1", name: "John Doe", rating: 5, comment: "Great service! Highly recommend." },
        { id: "2", name: "Jane Smith", rating: 4, comment: "Very professional and on time!" },
        { id: "3", name: "Mike Johnson", rating: 3, comment: "Good service, but could improve punctuality." },
    ];

    // Share handler
    const handleShare = async (date) => {
        try {
            await Share.share({
                message: `Check out ${parsedService.name} for ${parsedService} services!`,
            });
        } catch (error) {
            Alert.alert('Error', 'Unable to share at the moment.');
        }
    };

    // Booking handler
    const handleBook = (date) => {
        if (selectedDateTime) {
            console.log(parsedService);
            return;
        }

        setSelectedDate(date);
        router.push({
            
        })
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Back Button */}
            <BackButton text={"Back"}/>

            {/* Service Provider Info */}
            <View style={styles.card}>
                <Text style={styles.name}>{parsedService.name || "Ah Beng"}</Text>
                <Text style={styles.service}>{parsedService.service || "Aircon Service"}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={18} color="gray" />
                    <Text style={styles.location}>{parsedService.location}</Text>
                </View>
                <Text style={styles.price}>Starting from {parsedService.price || 50} SGD</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.bookButton]} onPress={handleBook}>
                    <Text style={styles.buttonText}>Book Provider</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.shareButton]} onPress={handleShare}>
                    <FontAwesome name="share" size={20} color="white" />
                    <Text style={styles.buttonText}>Share</Text>
                </Pressable>
            </View>

            {/* Divider */}
            <Divider customStyle={styles.divider}/>

            {!selectedDateTime && (
                <View>
                    {/* Available Time slots */}
                    <View>
                        <Text style={styles.sectionTitle}>Available Time Slots</Text>
                        {Object.entries(availableTimes).map(([day, time]) => (
                            <Text key={day} style={styles.timeslot}>{day}: {time}</Text>
                        ))}
                    </View>

                    {/* Divider */}
                    <Divider customStyle={styles.divider}/>

                    {/* Calendar View for Booking */}
                    <Text style={styles.sectionTitle}>Select Available Date</Text>
                    <CalendarPrice
                        selectedDate={selectedDate}
                        onDayPress={handleBook}
                    />

                    {/* Divider */}
                    <Divider customStyle={styles.divider}/>
                </View>
            )}

            

            {selectedDate && availableDates[selectedDate] && (
                <Text style={styles.price}>Price: {availableDates[selectedDate].price}</Text>
            )}

            {/* Rating and Reviews */}
            <View style={[styles.reviewHeader, {"marginBottom": 10}]}>
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
                <Text style={styles.reviewText}>({service.reviews})</Text>
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
                <Text style={styles.rating}>{service.rating}</Text>
                
            </View>
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
})
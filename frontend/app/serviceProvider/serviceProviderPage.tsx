import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Share } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Divider from '@/components/divider';
import BackButton from '@/components/BackButton';
import CalendarPrice from '@/components/calendarPrice';
import { fetchServiceReviewByServiceProviderId } from '@/services/serviceReviewApi';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ServiceProviderPage ({}) {

    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;
   
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [reviews, setReviews] = useState([]);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        Array.from({ length: 24 * 2 }, (_, i) => {
            const hour = Math.floor(i / 2);
            const minute = i % 2 === 0 ? "00" : "30";
            const time = `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
    
            // Exclude 12 AM - 6 AM and 2 PM - 4 PM
            if ((hour >= 0 && hour < 6) || (hour >= 14 && hour < 16)) {
                return null; // Filter out these times
            }
    
            return { label: `${time} - $45`, value: time };
        }).filter(Boolean) // Remove null values
    );

    useEffect(() => {
        fetchReviewProvider();
    }, [])

    const fetchReviewProvider = async() => {
        try {
            const data = await fetchServiceReviewByServiceProviderId(parsedData?.spID);
            console.log('check dataa', data);
            setReviews(data);
        } catch (e) {
            console.log("error fetch review service provider", e?.response?.data);
        }
    }

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

    const bookProviderOnPress = () => {

        // From finding aircon service
        if (parsedData?.description) {
            handleBook();

        // FROM 'browse' tab
        } else {
            setCalendarVisible(true)
        }
        
    }

    // Book Service
    const handleBook = () => {
        if (parsedData?.selectedDate) {
            router.push({
                pathname: "../review/reviewOrder",
                params: {
                data: JSON.stringify({
                    selectedTime: selectedTime,
                    selectedPrice: 40,
                    ...parsedData,
                })
                }
            });
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Back Button */}
            <BackButton text={"Back"} noMargin={true} />

            {/* Service Provider Info */}
            <View style={styles.card}>
                <Text style={styles.name}>{parsedData?.provider?.name || parsedData?.name || "Ah Beng"}</Text>
                <Text style={styles.service}>{parsedData?.service?.category || parsedData?.category || "Aircon Service"}</Text>
                <View style={styles.locationContainer}>
                    <FontAwesome name="map-marker" size={18} color="gray" />
                    <Text style={styles.location}>{parsedData?.provider?.distance || parsedData?.distance} km</Text>
                </View>
                <Text style={styles.price}>
                    {parsedData?.selectedTime ? 'Price' : 'Starting from'} {parsedData?.provider?.price || parsedData?.price ||50} SGD
                </Text>
            </View>
            
            {/* Select Time */}
            <View style={{ marginBottom: 20 }}>
                <Text style={styles.timeTitle}>Starting Time</Text>
                <DropDownPicker
                    open={open}
                    value={selectedTime}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedTime} // <-- This ensures the selected value updates
                    setItems={setItems}
                    placeholder="Select a time slot"
                    dropDownDirection="BOTTOM"
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdown}
                    labelStyle={styles.dropdownLabel}
                    placeholderStyle={styles.dropdownPlaceholder}
                    scrollViewProps={{ nestedScrollEnabled: true }}
                />  
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.bookButton]} onPress={bookProviderOnPress}>
                    <Text style={styles.buttonText}>Book Provider</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.shareButton]} onPress={handleShare}>
                    <FontAwesome name="share" size={20} color="white" />
                    <Text style={styles.buttonText}>Share</Text>
                </Pressable>
            </View>
            
            {/* Divider */}
            <Divider customStyle={styles.divider} />

            {/* Rating and Reviews */}
            <View style={[styles.reviewHeader, {"marginBottom": 10}]}>
                <Text style={styles.sectionTitle}>Customer Reviews</Text>

                {reviews?.length != 0 && (
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewText}>({parsedData?.provider?.reviews?.length || reviews?.length})</Text>
                        <Text style={styles.rating}>{parsedData?.provider?.rating}</Text>
                        <FontAwesome name="star" size={18} color="#fabb05" />
                    </View>
                )}
                
            </View>
            <View style={styles.ratingContainer}>
                {reviews?.length == 0 && (
                    <Text>No Reviews</Text>
                )}
                {reviews?.map((review, index) => (
                    <View style={styles.reviewCard} key={index}>
                        <View style={styles.reviewHeader}>
                            <Text style={styles.reviewName}>{review.name || "John Doe"}</Text>
                            <View style={styles.reviewRating}>
                                <Text style={styles.reviewText}> {review.rating}</Text>
                                <FontAwesome name="star" size={16} color="#fabb05" />
                            </View>
                        </View>
                        <Text style={styles.reviewComment}>{review.comments}</Text>
                    </View>
                ))}
            </View>

            {/* Divider */}
            <Divider customStyle={styles.divider} />

            {/* Show Calendar only when "Book Provider" button is pressed */}
            {isCalendarVisible && (
                <View>
                    <Text style={styles.sectionTitle}>Select Available Date</Text>
                    <CalendarPrice
                        selectedDate={selectedDate}
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                    />

                    {/* Divider */}
                    <Divider customStyle={styles.divider} />
                </View>
            )}

            {selectedDate && (
                <Text style={styles.price}>Price: {45} SGD</Text>
            )}

            {/* Book Button - Submit booking */}
            {isCalendarVisible && selectedDate && (
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
        marginTop: 20
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

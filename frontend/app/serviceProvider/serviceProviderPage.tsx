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

    const pricing = parsedData?.provider?.ServiceTypes[0]?.basePrice + parsedData?.provider?.ServiceTypes[0]?.consultPrice || 0;
    const price = (selectedTime && getPrice(parseInt(selectedTime.slice(0, 2), 10), pricing))|| 
            parsedData?.service?.price || 0;

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        Array.from({ length: 24 * 2 }, (_, i) => {
            const hour = Math.floor(i / 2);
            const minute = i % 2 === 0 ? "00" : "30";
            const time = `${hour.toString().padStart(2, "0")}${minute}`; // 24-hour format
    
            // Exclude 0000 - 0600 and 1400 - 1600
            if ((hour >= 0 && hour < 6) || (hour >= 14 && hour < 16)) {
                return null; // Filter out these times
            }
    
            let price = getPrice(hour, pricing);
    
            return { label: `${time} - $${price}`, value: time };
        }).filter(Boolean) // Remove null values
    );

    useEffect(() => {
        fetchReviewProvider();
    }, [])

    const fetchReviewProvider = async() => {
        try {
            console.log(parsedData)
            const data = await fetchServiceReviewByServiceProviderId(parsedData?.provider?.spID);
            // console.log('check dataa', data);
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
                    selectedPrice: price,
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
                    {selectedTime ? "Price" : "Ranging"}
                    {" : "}
                    {selectedTime ? price : `$${pricing} - $${pricing + 30}`}
                </Text>
            </View>

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

            {/* Book Button - Submit booking */}
            {isCalendarVisible && selectedDate && (
                <Pressable style={[styles.button, styles.bookButton]} onPress={handleBook}>
                    <Text style={styles.buttonText}>Confirm Booking</Text>
                </Pressable>
            )}
            
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
        </ScrollView>
    );
}

const getPrice = (hour, minPrice) => {
    let price = minPrice; // Default price

    // Adjust price based on time
    if (hour >= 6 && hour < 9) {
        price = minPrice; // Morning (6 AM - 9 AM) is cheaper
    } else if (hour >= 9 && hour < 12) {
        price = minPrice + 15; // Regular price (9 AM - 12 PM)
    } else if (hour >= 12 && hour < 14) {
        price = minPrice + 20; // Midday (12 PM - 2 PM) is slightly more expensive
    } else if (hour >= 16 && hour < 18) {
        price = minPrice + 25; // Late afternoon (4 PM - 6 PM) is more expensive
    } else if (hour >= 18 && hour < 21) {
        price = minPrice + 30; // Evening (6 PM - 9 PM) is even more expensive
    } else if (hour >= 21) {
        price = minPrice + 20; // Late night (9 PM onwards) is cheaper again
    }
    return price;
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
        marginBottom: 50
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

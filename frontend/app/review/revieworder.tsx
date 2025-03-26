import React, { useState } from 'react';
import {
    StyleSheet,
    Platform,
    Pressable,
    View,
    TextInput,
    ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ServiceItem = {
    serviceName: string;
    quantity: number;
    price: number;
};

type ReceiptCardProps = {
    companyName: string;
    services: ServiceItem[];
    travellingCost: number;
    consultationFee: number;
    commissionRate: number;
};

const ReceiptCard = ({
    companyName,
    services,
    travellingCost,
    consultationFee,
    commissionRate = 0.05,
}: ReceiptCardProps) => {
    const calculateSubtotal = (): number => {
        const serviceTotal = services.reduce(
            (sum, service) => sum + service.price * service.quantity,
            0
        );
        return serviceTotal + travellingCost + consultationFee;
    };

    const subtotal = calculateSubtotal();
    const commissionFee = subtotal * commissionRate;
    const grandTotal = subtotal + commissionFee;

    const formatPrice = (price: number): string => {
        return `S$${price.toFixed(2)}`;
    };

    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.companyName}>{companyName}</ThemedText>
            {services.map((service, index) => (
                <ThemedView key={index} style={styles.itemRow}>
                    <ThemedText>{service.quantity.toString()}x {service.serviceName}</ThemedText>
                    <ThemedText>{formatPrice(service.price * service.quantity)}</ThemedText>
                </ThemedView>
            ))}
            <ThemedView style={styles.itemRow}>
                <ThemedText>Travelling Cost</ThemedText>
                <ThemedText>{formatPrice(travellingCost)}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.itemRow}>
                <ThemedText>Consultation Fee</ThemedText>
                <ThemedText>{formatPrice(consultationFee)}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.itemRow, styles.subtotalRow]}>
                <ThemedText>Subtotal</ThemedText>
                <ThemedText>{formatPrice(subtotal)}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.itemRow}>
                <ThemedText>Tinkerly Fee ({(commissionRate * 100).toFixed(2)}%)</ThemedText>
                <ThemedText>{formatPrice(commissionFee)}</ThemedText>
            </ThemedView>
            <ThemedView style={[styles.itemRow, styles.totalRow]}>
                <ThemedText style={styles.totalText}>Grand Total</ThemedText>
                <ThemedText style={styles.totalText}>{formatPrice(grandTotal)}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
};

const TimePanel = () => {
    return (
        <ThemedView style={styles.timePanel}>
            <ThemedView style={styles.timePanelHeader}>
                <ThemedText style={styles.timePanelTitle}>Booking Details</ThemedText>
            </ThemedView>

            <ThemedView style={styles.timeDetails}>
                <ThemedView style={styles.timeRow}>
                    <Ionicons name="calendar-outline" size={20} color="#41A48F" />
                    <ThemedText style={styles.timeText}>Date: March 25, 2024</ThemedText>
                </ThemedView>

                <ThemedView style={styles.timeRow}>
                    <Ionicons name="time-outline" size={20} color="#41A48F" />
                    <ThemedText style={styles.timeText}>Time: 2:30 PM</ThemedText>
                </ThemedView>

                <ThemedView style={styles.timeRow}>
                    <Ionicons name="hourglass-outline" size={20} color="#41A48F" />
                    <ThemedText style={styles.timeText}>Duration: 2 hours</ThemedText>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#41A48F',
    },
    backButton: {
        padding: 8,
    },
    placeholder: {
        width: 40, // Same width as back button for centering title
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === 'android' ? 3 : undefined,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subtotalRow: {
        marginBottom: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    totalRow: {
        marginTop: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    timePanel: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 20,
        marginTop: 0,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === 'android' ? 3 : undefined,
    },
    timePanelHeader: {
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    timePanelTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#41A48F',
    },
    timeDetails: {
        gap: 12,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timeText: {
        fontSize: 15,
        color: '#333',
    },
    descriptionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 0,
        marginBottom: 20,
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
    backHomeButton: {
        backgroundColor: '#41A48F',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    backHomeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    extraCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    extraInput: { // Style for the TextInput
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        minHeight: 80, // Adjust as needed
        textAlignVertical: 'top',
    },
    // Style for Confirm Booking button
    confirmBookingButton: {
        backgroundColor: '#41A48F',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmBookingText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
    walletBalance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    centerButtonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    confirmButton: {
        backgroundColor: '#41A48F',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    editButtonContainer: { // New container for positioning
        alignItems: 'flex-end', // Align to the right
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#41A48F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
        width: '100%',
    },
    blackBorder: {
        backgroundColor: '#000000',
        height: 2,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default function ReviewOrder() {
    const description =
        "Customer's air-con is not cold. Requires cleaning and servicing. We performed suctioning and cleaning of the webbing to fix the issue.";
    const walletBalance = 100;
    const [extraRequests, setExtraRequests] = useState('');
    const { data = null } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;

    const selectedService = parsedData?.selectedService;
    const selectedDate = parsedData?.selectedDate;
    const selectedTime = parsedData?.selectedTime;

    const router = useRouter();
    
    console.log('REVIEW ORDER ', parsedData);

    const orderData = {
        extraRequirement: extraRequests,
        description: selectedService?.description,
        finalPrice: selectedService?.price,
        date: selectedDate,
        time: selectedTime,
        customerID: 1, // Replace with actual customer ID
        typeID: selectedService?.typeID, // Replace with actual type ID
      };
    
    // Function to handle confirm booking
    const handleConfirmBooking = async () => {
        try {
            router.push('../order/orderreceipt');
            const response = await fetch('https://cs206-tinkerly.onrender.com/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Booking confirmed:', data);
            // Navigate to next screen or display confirmation message
        } catch (error) {
            console.error('Error confirming booking:', error);
            // Handle error, e.g., display error message
        }
    // try {
    //     // Send data to API
    //     const response = await axios.post('https://https://cs206-tinkerly.onrender.com/bookings', orderData);
    //     console.log('Booking confirmed:', response.data);
    //     // Navigate to next screen or display confirmation message
    //     router.push('/orderreceipt');
    // } catch (error) {
    //     console.error('Error confirming booking:', error);
    //     // Handle error, e.g., display error message
    // }
    };

    console.log('REVIEW ORDER ', parsedData);

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#41A48F" />
                </Pressable>
                <ThemedText style={styles.headerTitle}>Order Receipt</ThemedText>
                <View style={styles.placeholder} />
            </ThemedView>

            <ScrollView>
                {/* Receipt Card */}
                <ReceiptCard
                    companyName="Example Company"
                    services={[
                        { serviceName: 'AC Repair', quantity: 1, price: 35.00 }
                    ]}
                    travellingCost={5.00}
                    consultationFee={5.00}
                    commissionRate={0.05}
                />

                {/* Time Panel */}
                <TimePanel />

                {/* Description Card */}
                <ThemedView style={styles.descriptionCard}>
                    <ThemedText style={styles.descriptionTitle}>Service Description</ThemedText>
                    <ThemedText style={styles.descriptionText}>{description}</ThemedText>
                </ThemedView>

                {/* Extra Requests (Optional)*/}
                <ThemedView style={styles.extraCard}>
                    <ThemedText style={styles.descriptionTitle}>
                        Extra Requests (Optional)
                    </ThemedText>
                    <TextInput
                        style={styles.extraInput}
                        placeholder="Enter your extra requests here..."
                        multiline={true}
                        value={extraRequests}
                        onChangeText={setExtraRequests}
                    />
                </ThemedView>

                {/* Confirm Payment Method */}
                <ThemedView style={styles.extraCard}>
                    <View>
                        <ThemedText style={styles.descriptionTitle}>
                            Confirm Payment Method
                        </ThemedText>
                        <ThemedText style={styles.descriptionText}>
                            <ThemedView style={styles.walletBalance}>
                                <View>
                                    <ThemedText>Tinkerly Wallet</ThemedText>
                                    <ThemedText>Current Balance</ThemedText>
                                    <ThemedText>S${walletBalance.toFixed(2)}</ThemedText>
                                </View>
                            </ThemedView>
                        </ThemedText>
                    </View>
                    <View style={styles.editButtonContainer}>
                        <Pressable
                            style={styles.editButton}
                            onPress={() => router.push('../order/payment')}
                        >
                            <ThemedText style={styles.editButtonText}>Edit</ThemedText>
                        </Pressable>
                    </View>
                </ThemedView>

                {/* Confirm Booking Button */}
                <Pressable
                    style={styles.confirmBookingButton}
                    onPress={handleConfirmBooking}
                >
                    <ThemedText style={styles.confirmBookingText}>Confirm Booking</ThemedText>
                </Pressable>
            </ScrollView>
        </ThemedView>
    );
}
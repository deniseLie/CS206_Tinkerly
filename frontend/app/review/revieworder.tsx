import React, { useState } from 'react';
import {
    StyleSheet,
    Platform,
    Pressable,
    View,
    Text,
    ScrollView,
    Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import DescriptionCard from '@/components/descriptionCard';
import ConfirmPaymentMethod from '@/components/confirmPaymentMethod';
import ExtraReqInput from '@/components/ExtraReqInput';
import { createService } from '@/services/serviceApi';

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
    service,
    selectedPrice,
    travellingCost,
    consultationFee,
}: ReceiptCardProps) => {
    const subtotal = selectedPrice;
    const commissionFee = subtotal * 0.07;
    const grandTotal = subtotal + commissionFee + travellingCost + consultationFee;

    const formatPrice = (price: number): string => `S$${price}`;

    return (
        <View style={styles.card}>
            <Text style={styles.companyName}>{companyName}</Text>
            <View style={styles.itemRow}>
                <Text>{1}x {service.category}</Text>
                <Text>{formatPrice(selectedPrice)}</Text>
            </View>
            <View style={styles.itemRow}><Text>Travelling Cost</Text><Text>{formatPrice(travellingCost)}</Text></View>
            <View style={styles.itemRow}><Text>Consultation Fee</Text><Text>{formatPrice(consultationFee)}</Text></View>
            {/* <View style={styles.itemRow}><Text>Subtotal</Text><Text>{formatPrice(subtotal)}</Text></View> */}
            <View style={styles.itemRow}><Text>Tinkerly Fee (7%)</Text><Text>{formatPrice(commissionFee)}</Text></View>
            <View style={styles.itemRow}><Text style={styles.totalText}>Grand Total</Text><Text style={styles.totalText}>{formatPrice(grandTotal)}</Text></View>
        </View>
    );
};

export default function ReviewOrder() {
    const [extraRequests, setExtraRequests] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { data = null } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;
    const router = useRouter();

    const orderData = {
        extraRequirement: extraRequests,
        description: parsedData?.description,
        finalPrice: (parsedData?.selectedPrice + 10),
        date: parsedData?.selectedDate,
        time: parsedData?.selectedTime,
        customerID: 1,
        typeID: parsedData?.service?.ServiceType?.[0],
    };

    const handleConfirmBooking = async () => {
        try {
            console.log(orderData);
            const res = await createService(orderData);
            console.log('handleConfirmBooking', res);
            setModalVisible(false);
            router.push('/(tabs)/order');
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <BackButton text="Review Order" noMargin={true}/>
            <ScrollView>
               
                <ReceiptCard
                    companyName={parsedData?.provider?.name}
                    service={parsedData?.service}
                    selectedPrice={parsedData?.selectedPrice}
                    travellingCost={5.00}
                    consultationFee={5.00}
                    commissionRate={0.05}
                />

                <DescriptionCard description={parsedData?.description}/>

                {/* Extra request */}
                <ExtraReqInput extraRequests={extraRequests} setExtraRequests={setExtraRequests} />

                {/* Confirm Payment method */}
                <ConfirmPaymentMethod />

                <Pressable style={styles.confirmBookingButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.confirmBookingText}>Confirm Booking</Text>
                </Pressable>
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Booking</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to confirm this booking?
                        </Text>

                        <View style={styles.modalButtons}>
                            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable style={styles.confirmButton} onPress={handleConfirmBooking}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingTop: 40, paddingHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#41A48F' },
    backButton: { padding: 8 },
    placeholder: { width: 40 },
    card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
    companyName: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: 'black' },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    totalText: { fontWeight: 'bold', fontSize: 16 },
    confirmBookingButton: { backgroundColor: '#41A48F', margin: 20, padding: 16, borderRadius: 10, alignItems: 'center' },
    confirmBookingText: { color: '#FFF', fontSize: 16, fontWeight: '500' },

    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    modalText: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    cancelButton: { backgroundColor: '#ccc', padding: 10, borderRadius: 5, flex: 1, marginRight: 10, alignItems: 'center' },
    cancelButtonText: { color: '#333', fontSize: 14, fontWeight: 'bold' },
    confirmButton: { backgroundColor: '#41A48F', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
    confirmButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
});
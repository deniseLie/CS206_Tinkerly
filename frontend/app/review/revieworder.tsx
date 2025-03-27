import React, { useState } from 'react';
import {
    StyleSheet,
    Platform,
    Pressable,
    View,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
    commissionRate = 0.05,
}: ReceiptCardProps) => {
    const subtotal = selectedPrice;
    const commissionFee = subtotal * commissionRate;
    const grandTotal = subtotal + commissionFee + travellingCost + consultationFee;

    const formatPrice = (price: number): string => `S$${price}`;

    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.companyName}>{companyName}</ThemedText>
            <ThemedView style={styles.itemRow}>
                <ThemedText>{1}x {service.category}</ThemedText>
                <ThemedText>{formatPrice(selectedPrice)}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.itemRow}><ThemedText>Travelling Cost</ThemedText><ThemedText>{formatPrice(travellingCost)}</ThemedText></ThemedView>
            <ThemedView style={styles.itemRow}><ThemedText>Consultation Fee</ThemedText><ThemedText>{formatPrice(consultationFee)}</ThemedText></ThemedView>
            {/* <ThemedView style={styles.itemRow}><ThemedText>Subtotal</ThemedText><ThemedText>{formatPrice(subtotal)}</ThemedText></ThemedView> */}
            <ThemedView style={styles.itemRow}><ThemedText>Tinkerly Fee ({(commissionRate * 100)}%)</ThemedText><ThemedText>{formatPrice(commissionFee)}</ThemedText></ThemedView>
            <ThemedView style={styles.itemRow}><ThemedText style={styles.totalText}>Grand Total</ThemedText><ThemedText style={styles.totalText}>{formatPrice(grandTotal)}</ThemedText></ThemedView>
        </ThemedView>
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
        finalPrice: parsedData?.service?.price,
        date: parsedData?.selectedDate,
        time: parsedData?.selectedTime,
        customerID: 1,
        typeID: parsedData?.service?.id,
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
        <ThemedView style={styles.container}>
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
                    <ThemedText style={styles.confirmBookingText}>Confirm Booking</ThemedText>
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
                        <ThemedText style={styles.modalTitle}>Confirm Booking</ThemedText>
                        <ThemedText style={styles.modalText}>
                            Are you sure you want to confirm this booking?
                        </ThemedText>

                        <View style={styles.modalButtons}>
                            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                            </Pressable>

                            <Pressable style={styles.confirmButton} onPress={handleConfirmBooking}>
                                <ThemedText style={styles.confirmButtonText}>Confirm</ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', marginTop: 40, marginHorizontal: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#41A48F' },
    backButton: { padding: 8 },
    placeholder: { width: 40 },
    card: { backgroundColor: '#fff', borderRadius: 10, padding: 20, marginVertical: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    companyName: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
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
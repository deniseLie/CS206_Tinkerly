import React from 'react';
import { StyleSheet, Platform, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define the structure of the service object
type Service = {
  customerID: number;
  date: string;
  description: string | null;
  extraRequirement: string;
  finalPrice: number;
  serviceID: number;
  time: string;
  typeID: number | null;
};

type OrderProps = {
  companyName: string;
  service: Service;
  travellingCost: number;
  consultationFee: number;
  trackOrder: boolean;
};


const OrderCard = ({ order }: { order: OrderProps }) => {
  const subtotal = order?.service?.finalPrice || order?.finalPrice + order.travellingCost + order.consultationFee;
  const tinkerlyFee = subtotal * 0.05;
  const grandTotal = subtotal + tinkerlyFee;

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.companyName}>{order.companyName}</ThemedText>

      <ThemedView style={styles.row}>
        <ThemedText>{order.service.name} ({order.service.startTime}-{order.service.endTime})</ThemedText>
        <ThemedText>S${order?.service?.finalPrice || order?.finalPrice}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Travelling Cost</ThemedText>
        <ThemedText>S${order.travellingCost}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Consultation Fee</ThemedText>
        <ThemedText>S${order.consultationFee}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      <ThemedView style={styles.row}>
        <ThemedText style={styles.subtotalText}>Subtotal</ThemedText>
        <ThemedText>S${subtotal}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Tinkerly Fee (5%)</ThemedText>
        <ThemedText>S${tinkerlyFee}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      <ThemedView style={styles.row}>
        <ThemedText style={styles.totalText}>Grand Total</ThemedText>
        <ThemedText style={styles.totalText}>S${grandTotal}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 8,
  },
  subtotalText: {
    fontWeight: '500',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    paddingTop: 16,
  },
  trackOrderButton: {
    backgroundColor: '#41A48F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

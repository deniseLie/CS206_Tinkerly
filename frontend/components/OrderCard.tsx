import React from 'react';
import { StyleSheet, Platform, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

type OrderProps = {
  companyName: string;
  services: Array<{
    name: string;
    price: number;
  }>;
  travellingCost: number;
  consultationFee: number;
  startTime: string;
  endTime: string;
  trackOrder: boolean
};

const OrderCard = ({ order }: { order: OrderProps }) => {
  const subtotal = order.services.reduce((sum, service) => sum + service.price, 0) 
    + order.travellingCost + order.consultationFee;
  const tinklerlyFee = subtotal * 0.05;
  const grandTotal = subtotal + tinklerlyFee;

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.companyName}>{order.companyName}</ThemedText>
      
      {order.services.map((service, index) => (
        <ThemedView key={index} style={styles.row}>
          <ThemedText>{service.name} ({order.startTime}-{order.endTime})</ThemedText>
          <ThemedText>S${service.price.toFixed(2)}</ThemedText>
        </ThemedView>
      ))}

      <ThemedView style={styles.row}>
        <ThemedText>Travelling Cost</ThemedText>
        <ThemedText>S${order.travellingCost.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Consultation Fee</ThemedText>
        <ThemedText>S${order.consultationFee.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      <ThemedView style={styles.row}>
        <ThemedText style={styles.subtotalText}>Subtotal</ThemedText>
        <ThemedText>S${subtotal.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.row}>
        <ThemedText>Tinkerly Fee (5%)</ThemedText>
        <ThemedText>S${tinklerlyFee.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      <ThemedView style={styles.row}>
        <ThemedText style={styles.totalText}>Grand Total</ThemedText>
        <ThemedText style={styles.totalText}>S${grandTotal.toFixed(2)}</ThemedText>
      </ThemedView>

      {order?.trackOrder && (
        <ThemedView style={styles.buttonContainer}>
          <Pressable 
            style={styles.trackOrderButton}
            onPress={() => router.push('/')}
          >
            <ThemedText style={styles.trackOrderText}>Track Order</ThemedText>
          </Pressable>
        </ThemedView>
      )}
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

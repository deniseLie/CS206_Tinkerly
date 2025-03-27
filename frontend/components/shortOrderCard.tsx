import React from 'react';
import { Platform, StyleSheet, Pressable } from "react-native";
import { ThemedView } from "./ThemedView"; // Ensure this exists in your project
import { ThemedText } from "./ThemedText"; // Ensure this exists in your project
import { router } from 'expo-router';

export default function ShortOrderCard({ order }) {
  const trackOrderPressed = (service) => {
    router.push({
      pathname: "/order/trackOrder",
      params: {
        data: JSON.stringify({
          service: service,
        }),
      },
    });
  };

  // Ensure order and service exist
  if (!order || !order.service) {
    return null; // or render a fallback UI
  }

  const subtotal = order?.service?.finalPrice || order?.finalPrice + order.travellingCost + order.consultationFee;
  const tinkerlyFee = subtotal * 0.05;
  const grandTotal = subtotal + tinkerlyFee;

  return (
    <Pressable 
        style={styles.card}
        onPress={() => trackOrderPressed(order.service)}
    >
      <ThemedText style={styles.companyName}>{order.companyName} ({grandTotal || 50} SGD)</ThemedText>
      
      {order?.service?.description && (
        <ThemedText>{order.service?.description}</ThemedText>
      )}
      
      <ThemedText style={styles.status}>Ongoing</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : undefined,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  trackOrderButton: {
    backgroundColor: '#41A48F',
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    color: '#41A48F',
    marginBottom: 6,
  },
});

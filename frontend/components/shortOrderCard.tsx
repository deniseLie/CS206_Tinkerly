import React from 'react';
import { Platform, StyleSheet, Pressable, Image, View, Text } from "react-native";
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
  const tinkerlyFee = subtotal * 0.07;
  const grandTotal = subtotal + tinkerlyFee;

  return (
    <Pressable 
        style={styles.card}
        onPress={() => trackOrderPressed(order.service)}
    >
      <Image source={require('frontend/assets/images/ahbeng.png')} style={styles.profileImage} />
      <View>
        <Text style={styles.companyName}>{order?.service?.providerName} ({grandTotal || 50} SGD)</Text>
        <Text>{order.service?.providerCategory}</Text>
        <Text>{order.service?.description}</Text>
        {/* <Text>{order.service?.time}</Text> */}
        
        {order?.trackOrder && (
          <Text style={styles.status}>Ongoing</Text>
        )}
      </View>
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
    flexDirection: 'row'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold'
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

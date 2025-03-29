import React from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';

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
    <View style={styles.card}>
      <Text style={styles.companyName}>{order.companyName}</Text>

      <View style={styles.row}>
        <Text>{order.service.name} ({order.service.startTime}-{order.service.endTime})</Text>
        <Text>S${order?.service?.finalPrice || order?.finalPrice}</Text>
      </View>

      <View style={styles.row}>
        <Text>Travelling Cost</Text>
        <Text>S${order.travellingCost}</Text>
      </View>

      <View style={styles.row}>
        <Text>Consultation Fee</Text>
        <Text>S${order.consultationFee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.subtotalText}>Subtotal</Text>
        <Text>S${subtotal}</Text>
      </View>

      <View style={styles.row}>
        <Text>Tinkerly Fee (5%)</Text>
        <Text>S${tinkerlyFee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalText}>Grand Total</Text>
        <Text style={styles.totalText}>S${grandTotal}</Text>
      </View>
    </View>
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

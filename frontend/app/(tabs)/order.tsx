import React, { useState } from 'react';
import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type OrderProps = {
  companyName: string;
  services: Array<{
    name: string;
    price: number;
  }>;
  travellingCost: number;
  consultationFee: number;
  date: string;
};

const OrderCard = ({ order }: { order: OrderProps }) => {
  const subtotal = order.services.reduce((sum, service) => sum + service.price, 0) 
    + order.travellingCost + order.consultationFee;
  const tinklerlyFee = subtotal * 0.05;
  const grandTotal = subtotal + tinklerlyFee;

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.date}>{order.date}</ThemedText>
      <ThemedText style={styles.companyName}>{order.companyName}</ThemedText>
      
      {order.services.map((service, index) => (
        <ThemedView key={index} style={styles.row}>
          <ThemedText>{service.name}</ThemedText>
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
    </ThemedView>
  );
};

// Add types for the booking details
type BookingDetails = {
  date: string;
  time: string;
  duration: string;
};

// Update TimePanel to accept props
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
    backgroundColor: '#41A48F',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 20,
  },
  tabWrapper: {
    position: 'relative',
    marginRight: 30,
  },
  tab: {
    paddingVertical: 15,
  },
  activeTabLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  ordersList: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
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
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});

export default function Order() {
  const [activeTab, setActiveTab] = useState('ongoing');

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Orders</ThemedText>
        <View style={styles.placeholder} />
      </ThemedView>

      {/* Tabs */}
      <ThemedView style={styles.tabsContainer}>
        <ThemedView style={styles.tabWrapper}>
          <Pressable 
            style={styles.tab} 
            onPress={() => setActiveTab('ongoing')}
          >
            <ThemedText style={[
              styles.tabText, 
              activeTab === 'ongoing' && styles.activeTabText
            ]}>
              Ongoing
            </ThemedText>
          </Pressable>
          {activeTab === 'ongoing' && <View style={styles.activeTabLine} />}
        </ThemedView>

        <ThemedView style={styles.tabWrapper}>
          <Pressable 
            style={styles.tab}
            onPress={() => setActiveTab('finished')}
          >
            <ThemedText style={[
              styles.tabText, 
              activeTab === 'finished' && styles.activeTabText
            ]}>
              Finished
            </ThemedText>
          </Pressable>
          {activeTab === 'finished' && <View style={styles.activeTabLine} />}
        </ThemedView>
      </ThemedView>

      {/* Orders List */}
      <View style={styles.ordersList}>
        {activeTab === 'ongoing' && (
          <>
            <OrderCard 
              order={{
                date: '23 Jan 2025',
                companyName: 'Ah Beng AC Services Pte Ltd',
                services: [{ name: '1x AC Repair', price: 35.00 }],
                travellingCost: 5.00,
                consultationFee: 5.00,
              }}
            />
          </>
        )}
      </View>

      {/* Track Order Button */}
      <ThemedView style={styles.buttonContainer}>
        <Pressable 
          style={styles.trackOrderButton}
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.trackOrderText}>Track Order</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
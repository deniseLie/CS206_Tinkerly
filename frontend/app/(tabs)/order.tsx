import React, { useState } from 'react';
import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import OrderCard from '@/components/OrderCard';

export default function Order() {
  const [activeTab, setActiveTab] = useState('ongoing');

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
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
          <View style={styles.tabContainer}>
            <ThemedText style={styles.dateText}>23 Jan 2025</ThemedText>
            <OrderCard 
              order={{
                companyName: 'Ah Beng AC Services Pte Ltd',
                services: [{ name: '1x AC Repair', price: 35.00 }],
                travellingCost: 5.00,
                consultationFee: 5.00,
                startTime: '14:30',
                endTime: '15:30',
                trackOrder: true
              }}
            />
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 10,
    backgroundColor: '#41A48F',
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
    justifyContent: 'center',
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
  tabContainer: {
    marginHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ordersList: {
    flex: 1,
    padding: 16,
  },
});

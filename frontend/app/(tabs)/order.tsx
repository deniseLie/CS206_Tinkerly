import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Pressable, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import OrderCard from '@/components/OrderCard';
import { fetchServices } from '@/services/serviceApi';
import { Service } from '@/types/interface';
import ShortOrderCard from '@/components/shortOrderCard';
import OrdersList from '@/components/OrdersList';

export default function Order() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'finished'>('ongoing');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

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
      <OrdersList services={services} loading={loading} activeTab={activeTab}/>
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


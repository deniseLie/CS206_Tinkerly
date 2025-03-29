import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform, Pressable, View, Text } from 'react-native';
import { fetchServices } from '@/services/serviceApi';
import { Service } from '@/types/interface';
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
        // console.log(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabWrapper}>
          <Pressable 
            style={styles.tab} 
            onPress={() => setActiveTab('ongoing')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'ongoing' && styles.activeTabText
            ]}>
              Ongoing
            </Text>
          </Pressable>
          {activeTab === 'ongoing' && <View style={styles.activeTabLine} />}
        </View>

        <View style={styles.tabWrapper}>
          <Pressable 
            style={styles.tab}
            onPress={() => setActiveTab('finished')}
          >
            <Text style={[
              styles.tabText, 
              activeTab === 'finished' && styles.activeTabText
            ]}>
              Finished
            </Text>
          </Pressable>
          {activeTab === 'finished' && <View style={styles.activeTabLine} />}
        </View>
      </View>

      {/* Orders List */}
      <OrdersList services={services} loading={loading} activeTab={activeTab}/>
    </View>
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


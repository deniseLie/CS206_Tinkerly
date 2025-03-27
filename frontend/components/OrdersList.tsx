import React from 'react';
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ShortOrderCard from '@/components/shortOrderCard';

const OrdersList = ({ services, loading, activeTab }) => {

  // console.log(services)

  // Sort services by date
  const sortedServices = services.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter services based on activeTab and the status of the service
  const filteredServices = sortedServices.filter((service) => {
    return activeTab === 'ongoing' ? service.ongoing : !service.ongoing;
  });

  // Group services by date
  const groupedServices = filteredServices.reduce((groups, service) => {
    const date = new Date(service.date).toLocaleDateString(); // Use date as the key
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(service);
    return groups;
  }, {});

  return (
    <ScrollView contentContainerStyle={styles.ordersList}>
      {loading ? (
        <ActivityIndicator size="large" color="#41A48F" />
      ) : (
        Object.keys(groupedServices).map((date) => (
          <View key={date}>
            <ThemedText style={styles.dateHeading}>{date.toString()}</ThemedText>
            {groupedServices[date].map((service, index) => (
              <View key={index} style={styles.tabContainer}>
                <ShortOrderCard order={{
                  service: service,
                  travellingCost: 5.00, // Hardcoded
                  consultationFee: 5.00, // Hardcoded
                  endTime: 'N/A', // Hardcoded
                  trackOrder: activeTab === 'ongoing'
                }} />
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ordersList: {
    padding: 16,
    paddingBottom: 30, // Ensure some space at the bottom
  },
  dateHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tabContainer: {
    marginBottom: 16, // Adds spacing between cards
  },
});

export default OrdersList;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LocationSearchBar, SearchBar } from '@/components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFilter from '@/components/ButtonFilter';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Link, useLocalSearchParams } from 'expo-router';
import BackButton from '@/components/BackButton';
import { fetchServiceProviders } from '@/services/serviceProviderApi';

export default function ServiceProviderBrowse() {

  // Params
  const { data = null } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : null;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Recommended");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterOptions = ["Recommended", "Nearby", "Highest Rated"];

  useEffect(() => {
    const getServiceProviders = async () => {
      try {
        const providers = await fetchServiceProviders();
        console.log("GET PROVIDERS ", providers);
        setServiceProviders(providers);
      } catch (error) {
        console.error("Failed to fetch service providers", error);
      } finally {
        setLoading(false);
      }
    };
    getServiceProviders();
  }, []);

  // Filter service providers
  const filteredServices = serviceProviders
    .filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (activeFilter === "Recommended") return b.rating - a.rating;
      if (activeFilter === "Nearby") return a.distance - b.distance;
      if (activeFilter === "Highest Rated") return b.rating - a.rating;
      return 0;
    });

  return (
    <View style={styles.container}>
      <BackButton text="Reselect Date/time" />
      <LocationSearchBar />
      <Text style={styles.headerText}>{parsedData?.service?.category || "All Services"}</Text>
      {parsedData?.selectedDate && parsedData?.selectedTime && (
        <Text style={styles.selectedInfo}>Selected Date: {parsedData.selectedDate}, Time: {parsedData.selectedTime}</Text>
      )}
      <Text style={styles.subHeadertext}>{serviceProviders.length} Service Providers</Text>
      <View style={styles.searchFilterProviderContainer}>
        <FontAwesome size={30} name="filter" color={"gray"} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search for Service Provider" />
        <Pressable>
          <FontAwesome size={30} name="question-circle" color={"gray"} />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filterOptions.map((option, index) => (
          <ButtonFilter key={index} buttonText={option} onPress={() => setActiveFilter(option)} active={activeFilter === option} />
        ))}
      </ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <View style={styles.servicesContainer}>
          {filteredServices.map((service, index) => (
            <Link
              key={index}
              href={{
                pathname: `/serviceProvider/serviceProviderPage`,
                params: { data: JSON.stringify({ provider: service, ...parsedData }) },
              }}
              style={{ textDecorationLine: 'none' }}
            >
              <ServiceProviderCard service={service} />
            </Link>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, backgroundColor: "white" },
  headerText: { fontSize: 20, fontWeight: '500' },
  subHeadertext: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  searchFilterProviderContainer: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  filterContainer: { flexGrow: 0, marginTop: 10, marginBottom: 20 },
  servicesContainer: { gap: 20 }
});

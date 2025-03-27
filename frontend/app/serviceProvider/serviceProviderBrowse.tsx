import React, { useState, useEffect } from 'react';
import ReviewOrder from '../review/reviewOrder';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LocationSearchBar, SearchBar } from '@/components/SearchBar';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ButtonFilter from '@/components/ButtonFilter';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import { fetchServiceProviderByServiceType, fetchServiceProviders } from '@/services/serviceProviderApi';

export default function ServiceProviderBrowse() {

  const router = useRouter();

  // Params
  const { data = null } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : null;

  // State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Recommended");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterOptions = ["Recommended", "Nearby", "Highest Rated"];

  // use effect
    useEffect(() => {
      loadServiceProvider();
    }, [])
  
    // function 
    const loadServiceProvider = async () => {
      try {
        const data = await fetchServiceProviderByServiceType("AC%20Repair");
        console.log('Fetch service provider', data);
        setServiceProviders(data);
      } catch (e) {
        console.error('Error fetching service provider', e);
      } finally { 
        setLoading(false);
      }
    }
    
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
      <BackButton text="Reselect Date/time" isHomeButton={true} noMargin={true}/>
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }} // Added padding
        style={styles.filterContainer}
      >
        {filterOptions.map((option, index) => (
          <ButtonFilter 
            key={index} 
            buttonText={option} 
            onPress={() => setActiveFilter(option)} 
            active={activeFilter === option} 
          />
        ))}
      </ScrollView>

        
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: `/serviceProvider/serviceProviderPage`,
                params: { data: JSON.stringify({ provider: item, ...parsedData }) },
              }}
              style={{ textDecorationLine: 'none' }}
            >
              <ServiceProviderCard service={item} />
            </Link>
          )}
          contentContainerStyle={styles.servicesContainer} 
          showsVerticalScrollIndicator={false} // Hides scrollbar
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, backgroundColor: "white" },
  headerText: { fontSize: 20, fontWeight: '500' },
  subHeadertext: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  searchFilterProviderContainer: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  filterContainer: { flexGrow: 0, marginTop: 10, marginBottom: 10, height: 80 },
  servicesContainer: { gap: 20 }
});

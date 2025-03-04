import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LocationSearchBar, SearchBar } from '@/components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFilter from '@/components/ButtonFilter';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Link } from 'expo-router';
import { fetchServiceProviders } from '@/services/serviceProviderApi';

export default function Browse() {

  // State
  const [serviceProvider, setServiceProvider] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Recommended");
  const filterOptions = ["Recommended", "Nearby", "Highest Rated"]

  const allServices = [
    { name: 'Bugis Air-Con', services: "AC Services", distance: "1 km", rating: 4.85, reviews: "11.9k", price: 55 },
    { name: 'Kim Chuan Air-Con', services: "AC Services", distance: "1 km", rating: 4.85, reviews: "11.9k", price: 50 },
    { name: 'Comfort Cooling', services: "AC Services", distance: "3 km", rating: 4.9, reviews: "5.2k", price: 60 },
    { name: 'Quick Fix Air-Con', services: "AC Services", distance: "2 km", rating: 4.7, reviews: "7.3k", price: 52 },
  ];

  const filteredServices = allServices
    .filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (activeFilter === "Recommended") return b.rating - a.rating;
      if (activeFilter === "Nearby") return parseFloat(a.distance) - parseFloat(b.distance);
      if (activeFilter === "Highest Rated") return b.rating - a.rating;
      return 0;
    });
  
  // use effect
  useEffect(() => {
    loadServiceProvider();
  }, [])

  // function 
  const loadServiceProvider = async () => {
    try {
      const data = await fetchServiceProviders();
      console.log('Fetch service provider', data);
      setServiceProvider(data);
    } catch (e) {
      console.error('Error fetching service provider', e);
    }
  }

  return (
    <View style={styles.container}>

      <LocationSearchBar />
      
      <Text style={styles.headerText}>All Services</Text>
      <Text style={styles.subHeadertext}>6842 Service Providers</Text>

      {/* Search Service provider */}
      <View style={styles.searchFilterProviderContainer}>
        <FontAwesome size={30} name="filter" color={"gray"}/>
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          searchPlaceholder="Search for Service Provider"
        />
        <Pressable>
          <FontAwesome size={30} name="question-circle" color={"gray"}/>
        </Pressable>
      </View>

      {/* Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filterOptions.map((option, index) => (
          <ButtonFilter 
            key={index} 
            buttonText={option} 
            onPress={() => setActiveFilter(option)} 
            active={activeFilter == option}/>
        ))}
      </ScrollView>

      {/* Services */}
      <View style={styles.servicesContainer}>
        {filteredServices?.map((service, index) => (
          <Link
            key={index}
            href={{
              pathname: `/serviceProvider/serviceProviderPage`,
              params: {service: JSON.stringify(service)}
            }}
            style={{ textDecorationLine: 'none' }}
          >
            <ServiceProviderCard service={service}/>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500'
  },
  subHeadertext: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold'
  },
  searchFilterProviderContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10
  },
  filterContainer: {
    flexGrow: 0,
    marginTop: 10,
    marginBottom: 20,
  },
  servicesContainer: {
    gap: 20
  }
})

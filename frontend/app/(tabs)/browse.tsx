import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LocationSearchBar, SearchBar } from '@/components/SearchBar';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonFilter from '@/components/buttonFilter';
import ServiceProviderCard from '@/components/ServiceProviderCard';

export default function Browse() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Recommended");

  const filterOptions = ["Recommended", "Nearby", "Highest Rated"]
  const services = ["test", "test"];

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
        {services?.map((service, index) => (
          <ServiceProviderCard
            key={index}
          />
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

  }
})

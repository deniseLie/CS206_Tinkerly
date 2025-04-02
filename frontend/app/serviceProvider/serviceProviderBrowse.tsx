import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LocationSearchBar, SearchBar } from '@/components/SearchBar';
import ButtonFilter from '@/components/ButtonFilter';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import { fetchServiceProviderByServiceType } from '@/services/serviceProviderApi';
import FilterPopup from '@/components/FilterPopup';

export default function ServiceProviderBrowse() {

  // Params
  const { data = null } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : null;
  // console.log("PARESEED", parsedData);

  // State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Recommended");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const filterOptions = ["Recommended", "Nearby", "Highest Rated"];

  const [isFilterPopupVisible, setFilterPopupVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  // use effect
    useEffect(() => {
      loadServiceProvider();
    }, [])
  
    // function 
    const loadServiceProvider = async () => {
      try {
        const data = await fetchServiceProviderByServiceType("AC%20Repair");
        console.log('Fetch service provider', JSON.stringify(data));
        setServiceProviders(data);
      } catch (e) {
        console.error('Error fetching service provider', e);
      } finally { 
        setLoading(false);
      }
    }

    const applyFilters = (filterData) => {
      // console.log("Applied Filters:", filterData);
      setAppliedFilters(filterData);
      // const { minPrice, maxPrice, minRatings, maxRatings, minBookings, maxBookings, joiningDate, sortOrder } = filterData;
      setFilterPopupVisible(false);
    };

    const clearFilters = () => {
      setAppliedFilters(null);
    }
    
  // Filter service providers
  const filteredServices = serviceProviders
    .filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(service => {
      if (!appliedFilters) return true;
      const { minPrice, maxPrice, minRatings, maxRatings, minBookings, maxBookings } = appliedFilters;
      const final_price = service?.ServiceTypes[0]?.basePrice + service?.ServiceTypes[0]?.consultPrice
      return (
        final_price >= minPrice && final_price <= maxPrice &&
        service.rating >= minRatings && service.rating <= maxRatings
      );
    })
    .sort((a, b) => {
      if (activeFilter === "Recommended") return b.rating - a.rating;
      if (activeFilter === "Nearby") return a.distance - b.distance;
      if (activeFilter === "Highest Rated") return b.rating - a.rating;
      return 0;
    });

  return (
    <ScrollView style={styles.container}>
      <BackButton text="Reselect Date/time" isHomeButton={true} noMargin={true}/>
      <LocationSearchBar />
      <Text style={styles.headerText}>{parsedData?.service?.category || "All Services"}</Text>
      {parsedData?.selectedDate && parsedData?.selectedTime && (
        <Text style={styles.selectedInfo}>Selected Date: {parsedData.selectedDate}, Time: {parsedData.selectedTime}</Text>
      )}
      <Text style={styles.subHeadertext}>{serviceProviders.length} Service Provider(s)</Text>

      {/* Search bar */}
      <View style={styles.searchFilterProviderContainer}>
        <Pressable onPress={() => setFilterPopupVisible(true)}>
          <FontAwesome size={30} name="filter" color={"gray"} />
        </Pressable>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search for Service Provider" />
        <Pressable>
          <FontAwesome size={30} name="question-circle" color={"gray"} />
        </Pressable>
      </View>

      {/* Filter tab */}
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

      {/* Applied filters */}
      {appliedFilters && (
        <View style={styles.appliedFiltersContainer}>
          <Text style={styles.appliedFiltersText}>Filters Applied</Text>
          <Pressable onPress={clearFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      )}

      {/* List of service providers */}
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <ScrollView 
          contentContainerStyle={styles.servicesContainer} 
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>
      )}

      <FilterPopup
          isVisible={isFilterPopupVisible}
          onClose={() => setFilterPopupVisible(false)}
          onApply={applyFilters} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20, backgroundColor: "white" },
  headerText: { fontSize: 20, fontWeight: '500' },
  subHeadertext: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  searchFilterProviderContainer: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  filterContainer: { flex: 0, marginTop: 10, marginBottom: 10},
  servicesContainer: { gap: 20, paddingBottom: 40 }
});

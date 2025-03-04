import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const HomeScreen = () => {
    
    const router = useRouter();
    const services = [
        { id: '1', name: 'Home Cleaning', icon: require('../../assets/icons/homecleaning.webp') },
        { id: '2', name: 'Deep Cleaning', icon: require('../../assets/icons/deepcleaning.png') },
        { id: '3', name: 'Air-con Servicing', icon: require('../../assets/icons/aircon.png') },
        { id: '4', name: 'Laundry', icon: require('../../assets/icons/laundry.png') },
        { id: '5', name: 'Electrical', icon: require('../../assets/icons/electrical.png') },
        { id: '6', name: 'Plumbing', icon: require('../../assets/icons/plumbing.png') },
        { id: '7', name: 'Repair & Assembly', icon: require('../../assets/icons/repair.png') },
        { id: '8', name: 'Pest Control', icon: require('../../assets/icons/pestcontrol.png') },
    ];

    const listings = [
        { id: '1', title: 'Bugis Electricians', type: 'Electrical | AC', distance: '1.7 km away' },
        { id: '2', title: 'UrbanFix Experts', type: 'AC', distance: '1.9 km away' },
        { id: '3', title: 'Swift Home Solutions', type: 'Electrical | Plumbing', distance: '2 km away' },
        { id: '4', title: 'BrightNest Services', type: 'Plumbing | Lockpick', distance: '5 km away' },
        { id: '5', title: 'Hong Yi Assistance', type: 'Homecleaning | AC', distance: '10+ km away' },
        { id: '6', title: 'Taman Services', type: 'Electrical | AC', distance: '1 km away' },
        { id: '7', title: 'Kaki Services', type: 'Electrical | AC', distance: '1 km away' },
        { id: '8', title: 'HomeMate Assistance', type: 'Electrical | AC', distance: '1 km away' },
        { id: '9', title: 'Kim Chuan Services', type: 'Electrical | AC', distance: '1 km away' },
    ];

    const onPressService = (item) => {
        console.log(item);
        router.push({
            pathname: "/issue/description",
            params: {
              data: JSON.stringify({
                service: JSON.stringify(item),
              })
            }
          })
    }

    const renderService = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceTypeBox}
            onPress={() => onPressService(item)}
        >
            <Image source={item.icon} style={styles.serviceTypeIcon} />
            <Text style={styles.serviceText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderListing = ({ item, index }) => (
            <TouchableOpacity 
                style={[
                    styles.serviceTypeBox,
                    styles.sponsoredBox,  // Apply the style to the first 4 items or adjust as needed
                ]}
            >
                <Text style={styles.listingTitle}>{item.title}</Text>
                <Text style={styles.listingType}>{item.type}</Text>
                <Text style={styles.listingDistance}>{item.distance}</Text>
            </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header Search Bar */}
            <View style={styles.header}>
                <TextInput
                style={styles.searchInput}
                placeholder="Search For Services"
                placeholderTextColor="#aaa"
                />
            </View>

            {/* Services Section */}
            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={renderService}
                numColumns={4}
                contentContainerStyle={styles.servicesContainer}
            />
            <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All Services   </Text>
                <Image
                    source={require('../../assets/icons/viewall.png')} // Replace with your actual icon
                    style={styles.viewAllIcon}
                />
            </TouchableOpacity>

            {/* Sponsored Section */}
            <Text style={styles.sectionTitle}>Sponsored</Text>
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id}
                renderItem={renderListing}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listingsContainer}
            />

            {/* Book Again Section */}
            <Text style={styles.sectionTitle}>Book Again</Text>
            <FlatList
                data={listings}
                keyExtractor={(item) => item.id}
                renderItem={renderListing}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listingsContainer}
            />

            {/* Footer Section */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Talk To Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>FAQ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; // Define screenHeight here

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        paddingTop: 40,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#41A48F',
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 16,
    },
    serviceTypeBox: {
        width: screenWidth / 4 - 15, // Adjust for spacing, 4 icons per row
        height: screenWidth / 4 - 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff', // White box background
        borderRadius: 10, // Rounded edges
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        margin: 8, // Space between boxes
    },
    serviceTypeIcon: {
        width: screenWidth / 10, // Reduce icon size
        height: screenWidth / 10,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    serviceText: {
        fontSize: 10, // Make text smaller for better spacing
        textAlign: 'center',
        color: '#333',
    },
    sponsoredBox: {
        width: screenWidth / 2.5,  // Increase width for Sponsored boxes (e.g., 1/3 of the screen width)
        height: screenHeight / 8,
        margin: 10,  // Optional: Add more margin to create space between sponsored boxes
    },
    listingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    listingType: {
        fontSize: 12,
        color: '#666',
    },
    listingDistance: {
        fontSize: 10,
        color: '#aaa',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    viewAllButton: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#41A48F', // Green background color
        borderRadius: 20, // Rounded edges
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center', // Center the button on the screen
        marginVertical: 15, // Add spacing around the button
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    viewAllIcon: {
        width: 20, // Icon size
        height: 20,
        resizeMode: 'contain',
        marginRight: 10, // Space between icon and text
    },
    viewAllText: {
        fontSize: 14,
        color: '#fff', // White text color
        fontWeight: 'bold',
    },
    listingsContainer: {
        paddingHorizontal: 10,  // Add some padding around the content
        alignItems: 'center', // Ensure items are centered within the list
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#41A48F',
        borderRadius: 10,
    },
    footerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
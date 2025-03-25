import React from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';

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
                title: "AC Services",
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to MyApp!</Text>
            <Link href="/explore">Go to Explore</Link>
            <Link href="/index">Go to Index</Link>
            <Link href="/browse?userId=123">Go to Browse</Link>
        </View>
    );
};


export default HomeScreen;

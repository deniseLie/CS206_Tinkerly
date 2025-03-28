import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';

const Description = () => {
    const router = useRouter();
    const services = [
        { id: '1', category: 'AC Repair', providers: '15 Service Providers', disabled: false },
        { id: '2', category: 'AC Installation', providers: '15 Service Providers', disabled: true },
        { id: '3', category: 'AC Replacement', providers: '15 Service Providers',  disabled: true },
    ];

    const onPressService = (item) => {
        if (item.disabled) return;
        router.push({
            pathname: "/issue/describeissue",
            params: {
                data: JSON.stringify({
                    service: item,
                })
            }
        })
    }

    const renderService = ({ item }) => (
        <TouchableOpacity 
            style={[styles.serviceCard, item.disabled && styles.disabledService]}
            onPress={() => onPressService(item)}
        >
            <Text style={styles.serviceCategory}>{item.category}</Text>
            {item.disabled && (<Text style={styles.serviceText}>(Coming Sooon) {`\n`}</Text>)}
            <Text style={styles.serviceDetails}>{item.providers}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Back Button */}
            <BackButton text={"Back"} />
            
            {/* Search Bar */}
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
                contentContainerStyle={styles.servicesList}
            />
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; // Define screenHeight here

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 16,
    },
    searchBarContainer: {
        marginBottom: 20,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    servicesList: {
        paddingBottom: 20,
        width: screenWidth / 2.5, 
        marginTop: 20,
        marginLeft: 20,
    },
    serviceCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
        height: screenHeight / 6,
    },
    disabledService: {
        backgroundColor: '#ddd',
        opacity: 0.5,
    },
    serviceCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#41A48F',
    },
    serviceDetails: {
        fontSize: 14,
        color: '#666',
    },
});

export default Description;
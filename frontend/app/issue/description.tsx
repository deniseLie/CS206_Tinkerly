import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';

const Description = () => {
    const router = useRouter();
    const { title } = useLocalSearchParams();

    const services = [
        { id: '1', category: 'Installation', providers: '15 Service Providers', price: '25 - 50 SGD' },
        { id: '2', category: 'Repair', providers: '15 Service Providers', price: '25 - 50 SGD' },
        { id: '3', category: 'Replacement', providers: '15 Service Providers', price: '25 - 50 SGD' },
    ];

    const onPressService = (item) => {
        console.log(item);
        router.push({
            pathname: "/issue/describeissue",
            params: {
                data: JSON.stringify({
                    service: JSON.stringify(item),
                })
            }
        });
    };

    const renderService = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => onPressService(item)}
        >
            <Text style={styles.serviceCategory}>{item.category}</Text>
            <Text style={styles.serviceDetails}>{item.providers}</Text>
            <Text style={styles.serviceDetails}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <BackButton text={"Back"} />
            <Text style={styles.headerTitle}>{title || "Default Title"}</Text>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search For Services"
                    placeholderTextColor="#aaa"
                />
            </View>
            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={renderService}
                contentContainerStyle={styles.servicesList}
            />
        </View>
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
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#41A48F',
        textAlign: 'center',
        marginVertical: 20,
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
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import BackButton from '@/components/BackButton';

const DescribeIssue = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            {/* Back Button */}
            <BackButton text={"Back"}/>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>AC Repair</Text>
            </View>

            {/* Upload Section */}
            <Text style={styles.sectionTitle}>Upload Photos and/or Videos</Text>
            <TouchableOpacity style={styles.uploadBox}>
                <Image 
                    source={require('../../assets/icons/camera.png')}
                    style={styles.uploadImage} 
                />
            </TouchableOpacity>

            {/* Brief Description */}
            <Text style={styles.sectionTitle}>Brief Description</Text>
            <TextInput
                style={styles.descriptionArea}
                placeholder="Provide relevant details such as type of AC, description of damage, etc."
                placeholderTextColor="#aaa"
                multiline={true}
                numberOfLines={4} // Optional: Sets a default height
                textAlignVertical="top" // Ensures text starts at the top
            ></TextInput>

            {/* Service Date & Time */}
            <Text style={styles.sectionTitle}>Service date & Time</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.button, styles.activeButton]}>
                    <Text style={[styles.buttonText, styles.activeButtonText]}>Urgent (today)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Schedule for later</Text>
                </TouchableOpacity>
            </View>

            {/* Confirm Address */}
            <Text style={styles.sectionTitle}>Confirm Address</Text>
            <TouchableOpacity style={styles.addressButton}>
                <Image
                    source={require('../../assets/icons/maps.png')} // Replace with your location icon path
                    style={styles.addressIcon}
                />
                <Text style={styles.addressText}>Your House</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#41A48F',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    uploadBox: {
        height: 150,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadImage: {
        width: 80, // Adjust as needed
        height: 80,
        resizeMode: 'contain',
    },
    descriptionArea: {
        height: 170, // Adjust height as needed
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlignVertical: 'top', // Aligns text to the top
        fontSize: 14,
        backgroundColor: '#fff', // Optional: Makes it visually distinct
    },
    addressButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    addressIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    addressText: {
        fontSize: 14,
        color: '#aaa',
    },
    continueButton: {
        backgroundColor: '#41A48F',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        alignSelf: 'center', // Centers the button horizontally
        width: '60%', // Adjust width as needed (e.g., 50%, 200)
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DescribeIssue;
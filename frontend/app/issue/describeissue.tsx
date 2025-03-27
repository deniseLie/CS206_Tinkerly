import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
} from 'react-native';
import BackButton from '@/components/BackButton';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';

const DescribeIssue = () => {
    const router = useRouter();

    // Params
    const { data = null } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;

    const onPressService = () => {
        router.push({
            pathname: "/serviceProvider/schedule_page",
            params: {
                data: JSON.stringify({
                    description: description,
                    urgency: activeButton,
                    ...parsedData
                })
            }
        })
    }

    const [description, setDescription] = useState('');
    const [activeButton, setActiveButton] = useState('urgent'); // Default to "urgent"

    // State to manage the image source
    const [imageSource, setImageSource] = useState(require('../../assets/icons/camera.png')); // Default image
    const [isImageUploaded, setIsImageUploaded] = useState(false); // Track if an image is uploaded

    // Function to handle image change
    const handleImageChange = () => {
        // Update the image source (use another local or remote image)
        setImageSource(require('../../assets/camerapics/airconleaking.jpg')); // Replace with your new image path
        setIsImageUploaded(true); // Mark image as uploaded
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    return (
        <View style={styles.container}>
            {/* Header */}
            {/* Back Button */}
            <BackButton text={"Back"} isHomeButton={true}/>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>AC Repair</Text>
            </View>

            <View style={{ marginHorizontal: 20 }}>

                {/* Upload Section */}
                <Text style={styles.sectionTitle}>Upload Photos and/or Videos</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={handleImageChange}>
                    <Image 
                        source={imageSource} 
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
                    value={description}
                    onChangeText={setDescription}
                ></TextInput>


                {/* Confirm Address */}
                <Text style={styles.sectionTitle}>Confirm Address</Text>
                <TouchableOpacity style={styles.addressButton} onPress={toggleModal}>
                    <Image
                        source={require('../../assets/icons/maps.png')}
                        style={styles.addressIcon}
                    />
                    <Text style={styles.addressText}>Your House</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Address Confirmation */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Image
                            source={require('../../assets/icons/locationexample.png')}
                            style={styles.modalImage}
                        />
                        <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
                            <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Continue Button */}
            <TouchableOpacity 
                style={[
                    styles.continueButton, 
                    (!description || !activeButton || !parsedData || !isImageUploaded) && styles.disabledButton
                ]} 
                onPress={onPressService}
                disabled={!description || !activeButton || !parsedData|| !isImageUploaded}
            >
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
        marginTop: 10
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
        borderWidth: 2,
        borderColor: '#ddd',
    },
    uploadImage: {
        height: 130,
        resizeMode: 'contain',
    },
    descriptionArea: {
        height: 170,
        borderWidth: 3,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlignVertical: 'top',
        fontSize: 14,
        backgroundColor: '#fff',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    buttonBox: {
        flex: 1, // Makes both buttons equal width
        borderWidth: 1, // Adds a border around the button
        borderColor: '#ddd', // Sets the border color to grey
        borderRadius: 10, // Adds rounded corners to the box
        paddingVertical: 15, // Adds vertical padding inside the box
        marginHorizontal: 5, // Adds spacing between the buttons
        backgroundColor: '#fff', // Default white background for inactive buttons
    },
    activeButtonBox: {
        backgroundColor: '#41A48F', // Green background for the active button
        borderColor: '#41A48F', // Matches the active background color
    },
    buttonText: {
        textAlign: 'center', // Centers text horizontally
        fontSize: 14,
        color: '#aaa', // Default grey text for inactive buttons
    },
    activeButtonText: {
        color: '#fff', // White text for the active button
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
        alignSelf:'center', 
         width:'60%',
     }, 
     disabledButton: {
        backgroundColor: '#ccc', // Greyed out when disabled
    },    
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },    
    confirmButton: {
        backgroundColor: '#41A48F', // Green background color
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#fff', // White text
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DescribeIssue;
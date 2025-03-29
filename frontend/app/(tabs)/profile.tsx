import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    const router = useRouter();

    const user = {
        name: "Sarah Tan",
        email: "sarahtan@example.com",
        phone: "+65 9123 4567",
    };

    return (
        <View style={styles.container}>
            {/* Profile Picture */}
            <Image source={require("frontend/assets/images/sarah.png")} style={styles.profilePic} />

            {/* User Details */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.info}>{user.phone}</Text>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',  // Light background for a fresh feel
        padding: 20,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#41A48F',  // Blue border for profile picture
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        color: '#333',
    },
    info: {
        fontSize: 16,
        color: '#555',
        marginBottom: 6,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#41A48F',  // Blue color for buttons
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#007bff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

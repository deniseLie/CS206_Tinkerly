import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    const router = useRouter();

    const user = {
        name: "Sarah Tan",
        email: "sarahtan@example.com",
        phone: "+65 9123 4567",
        profilePic: "https://via.placeholder.com/100", // Placeholder image
    };

    return (
        <View style={styles.container}>
            {/* Profile Picture */}
            <Image source={{ uri: user.profilePic }} style={styles.profilePic} />

            {/* User Details */}
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.info}>{user.phone}</Text>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.button} onPress={() => router.push("/profile/edit")}>
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
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        color: '#555',
        marginBottom: 4,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

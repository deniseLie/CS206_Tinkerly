import React from 'react';
import { View, Text, Image } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen = ({ navigation }) => {
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

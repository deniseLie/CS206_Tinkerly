import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // ✅ Correct hook for URL params

export default function Browse() {
  const { userId } = useLocalSearchParams();  // Extracts userId from URL

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen for User ID: {userId}</Text>
    </View>
  );
}

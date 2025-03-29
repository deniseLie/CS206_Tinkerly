import React, { useState } from 'react';
import { StyleSheet, Platform, Pressable, View, Image, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type PaymentMethod = {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  icon: any;
};

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState<string>('wallet');

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'wallet',
      title: 'Tinkerly Wallet',
      subtitle: 'Current Balance',
      value: 'S$100.00',
      icon: require('@/assets/images/wallet.png'),
    },
    {
      id: 'credit',
      title: 'Credit Card',
      subtitle: 'Visa',
      value: 'Ending 1234',
      icon: require('@/assets/images/credit-card.png'),
    },
    {
      id: 'paynow',
      title: 'PayNow',
      subtitle: 'Phone number',
      value: '+65 9123 4567',
      icon: require('@/assets/images/paynow.png'),
    },
  ];

  const PaymentCard = ({ method }: { method: PaymentMethod }) => {
    const isSelected = selectedMethod === method.id;
    const isDefault = method.id === 'wallet';

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image source={method.icon} style={styles.icon} />
          <View style={styles.cardDetails}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{method.title}</Text>
              {isDefault && (
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
            <Text style={styles.subtitle}>{method.subtitle}</Text>
            <Text style={styles.value}>{method.value}</Text>
          </View>
        </View>
        <Pressable
          style={[styles.selectButton, isSelected && styles.selectedButton]}
          // onPress={() => setSelectedMethod(method.id)}
        >
          <Text style={styles.selectButtonText}>
              {isSelected ? 'Selected' : 'Select'}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#41A48F" />
        </Pressable>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Payment Methods List */}
      <View style={styles.content}>
        {paymentMethods.map((method) => (
          <PaymentCard key={method.id} method={method} />
        ))}
      </View>

      {/* Add Payment Method Button */}
      <Pressable 
        style={styles.addButton}
        onPress={() => router.back()}
      >
        <Text style={styles.addButtonText}>Add payment method</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#41A48F',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  icon: {
    width: 43,
    height: 33,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  defaultTag: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
    fontFamily: 'Poppins',
    marginBottom: 1,
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Poppins',
  },
  selectButton: {
    backgroundColor: '#41A48F',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  selectedButton: {
    backgroundColor: '#2C7361',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#41A48F',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});


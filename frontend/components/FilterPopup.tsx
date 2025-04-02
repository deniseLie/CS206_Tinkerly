import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import Modal from 'react-native-modal';

const FilterPopup = ({ isVisible, onClose, onApply }) => {
  const [minPrice, setMinPrice] = useState('50');
  const [maxPrice, setMaxPrice] = useState('500');
  const [minRatings, setMinRatings] = useState('1');
  const [maxRatings, setMaxRatings] = useState('5');
  const [minBookings, setMinBookings] = useState('0');
  const [maxBookings, setMaxBookings] = useState('100');
  const [joiningDate, setJoiningDate] = useState('recent');
  const [sortOrder, setSortOrder] = useState('asc');

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.header}>Filter & Sort Options</Text>

        {/* Price Range */}
        <Text style={styles.label}>Price Range ($)</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} keyboardType="numeric" value={minPrice} onChangeText={setMinPrice} />
          <Text style={styles.toText}>to</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={maxPrice} onChangeText={setMaxPrice} />
        </View>

        {/* Ratings */}
        <Text style={styles.label}>Ratings (1-5)</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} keyboardType="numeric" value={minRatings} onChangeText={setMinRatings} />
          <Text style={styles.toText}>to</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={maxRatings} onChangeText={setMaxRatings} />
        </View>

        {/* Number of Bookings */}
        <Text style={styles.label}>Number of Bookings</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} keyboardType="numeric" value={minBookings} onChangeText={setMinBookings} />
          <Text style={styles.toText}>to</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={maxBookings} onChangeText={setMaxBookings} />
        </View>

        {/* Joining Date */}
        <Text style={styles.label}>Joining Date</Text>
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.toggleButton, joiningDate === 'recent' && styles.activeButton]}
            onPress={() => setJoiningDate('recent')}
          >
            <Text style={[styles.buttonText, joiningDate === 'recent' && styles.activeButtonText]}>Recent</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, joiningDate === 'old' && styles.activeButton]}
            onPress={() => setJoiningDate('old')}
          >
            <Text style={[styles.buttonText, joiningDate === 'old' && styles.activeButtonText]}>Oldest</Text>
          </Pressable>
        </View>

        {/* Sorting Order */}
        <Text style={styles.label}>Sort Order</Text>
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.toggleButton, sortOrder === 'asc' && styles.activeButton]}
            onPress={() => setSortOrder('asc')}
          >
            <Text style={[styles.buttonText, sortOrder === 'asc' && styles.activeButtonText]}>
                Ascending
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton, sortOrder === 'desc' && styles.activeButton]}
            onPress={() => setSortOrder('desc')}
          >
            <Text style={[styles.buttonText, sortOrder === 'desc' && styles.activeButtonText]}>
                Descending
            </Text>
          </Pressable>
        </View>

        {/* Apply & Cancel Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.applyButton}
            onPress={() => onApply({ minPrice, maxPrice, minRatings, maxRatings, minBookings, maxBookings, joiningDate, sortOrder })}
          >
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { justifyContent: 'center', alignItems: 'center' },
  container: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  label: { fontSize: 16, marginBottom: 8, alignSelf: 'flex-start', fontWeight: '600', color: '#444' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  toText: { fontSize: 16, color: '#444' },
  buttonGroup: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    color: 'black'
  },
  activeButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
    color: 'white'
  },
  buttonText: { fontSize: 16, color: 'black' },
  activeButtonText: { color: 'white' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, gap: 12 },
  applyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  applyText: { color: 'white', fontSize: 16, fontWeight: '600' },
  cancelButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, backgroundColor: '#f44336' },
  cancelText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default FilterPopup;

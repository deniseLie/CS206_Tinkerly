import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const OngoingProcessCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Svg width="20" height="20" viewBox="0 0 24 24">
          <Path
            d="M12 2v2a8 8 0 1 1-7.53 10.95l-1.9.63A10 10 0 1 0 22 12h2a12 12 0 1 1-12-12z"
            fill="black"
          />
        </Svg>
        <Text style={styles.title}>Ongoing Process</Text>
      </View>
      <Text style={styles.subtitle}>Your service provider is coming in 20 mins</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Path
              d="M6.6 10.8c1.2 2.6 3.2 4.6 5.8 5.8l1.9-1.9c.2-.2.5-.3.8-.2 1 .3 2 .5 3 .5.4 0 .8.3.8.8V20c0 .4-.3.8-.8.8C9 20.8 3.2 15 3.2 7.6c0-.4.3-.8.8-.8H8c.4 0 .8.3.8.8 0 1 .2 2 .5 3 .1.3 0 .6-.2.8l-1.9 1.9z"
              fill="black"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : undefined,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
  },
  callButton: {
    padding: 8,
  },
});

export default OngoingProcessCard;

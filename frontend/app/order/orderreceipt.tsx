import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import OrderCard from '@/components/OrderCard';
import BackButton from '@/components/BackButton';

export default function OrderReceipt() {
  return (
    <ThemedView style={styles.container}>
      
      <BackButton text="Order Receipt"/>

      <View>

        {/* Receipt Card */}
        <OrderCard 
          order={{
            companyName: "Example Company",
            services: [
              { name: "Aircon Cleaning", price: 80 },
              { name: "Fan Servicing", price: 40 },
            ],
            travellingCost: 10,
            consultationFee: 20,
            startTime: "2:30 PM",
            endTime: "4:30 PM",
            trackOrder: false
          }} 
        />
        
        {/* Description Card */}
        <ThemedView style={styles.descriptionCard}>
          <ThemedText style={styles.descriptionTitle}>Service Description</ThemedText>
          <ThemedText style={styles.descriptionText}>
            Customer's air-con is not cold. Requires cleaning and servicing. We performed suctioning and cleaning of the webbing to fix the issue.
          </ThemedText>
        </ThemedView>

        {/* Back to Home Button */}
        <Pressable 
          style={styles.backHomeButton}
          onPress={() => router.push('/')}
        >
          <ThemedText style={styles.backHomeText}>Back to Home</ThemedText>
        </Pressable>
      </View> 
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#41A48F',
  },
  placeholder: {
    width: 40, // Same width as back button for centering title
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : undefined,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    lineHeight: 20,
    color: '#333',
  },
  backHomeButton: {
    backgroundColor: '#41A48F',
    marginBottom: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  backHomeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import OrderCard from '@/components/OrderCard';
import BackButton from '@/components/BackButton';
import DescriptionCard from '@/components/descriptionCard';
import OngoingProcessCard from '@/components/OngoingProcessCard';
import ExtraReq from '@/components/ExtraReq';

export default function OrderReceipt() {
    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;
    
  return (
    <ThemedView style={styles.container}>
      
      <BackButton text="Track Order"/>

      <View>
        
        {/* Status Box */}
        <OngoingProcessCard />

        {/* Receipt Card */}
        <OrderCard 
          order={{
            companyName: 'Service Provider', // Adjust based on your API response
            service: parsedData?.service,
            travellingCost: 5.00, // Hardcoded
            consultationFee: 5.00, // Hardcoded
            endTime: 'N/A', // Hardcoded
            trackOrder: false
          }}
        />
        
        {/* Extra req */}
          {parsedData?.service?.extraRequirement && (
            <ExtraReq description={parsedData?.service?.extraRequirement}/>
          )}

        {/* Description Card */}
        <DescriptionCard description={parsedData?.service?.description || "None"}/>
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


import { useState } from 'react';
import { StyleSheet, Platform, Pressable, View, Modal, Text, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import OrderCard from '@/components/OrderCard';
import BackButton from '@/components/BackButton';
import DescriptionCard from '@/components/descriptionCard';
import OngoingProcessCard from '@/components/OngoingProcessCard';
import ExtraReq from '@/components/ExtraReq';

export default function trackOrder() {
  const { data } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : null;
  const [modalVisible, setModalVisible] = useState(false);

  // Function to show confirmation modal
  const handleCompleteOrder = () => {
    setModalVisible(true); // Show modal when the user clicks Complete Order
  };

  // Function to handle confirm action (navigate to Leave Review page)
  const confirmCompleteOrder = () => {
    setModalVisible(false); // Close the modal
    router.push({
      pathname: "/review/leaveReview",
      params: {
          data: JSON.stringify({
              service: parsedData?.service
          })
      }
    })
  };

  // Function to handle cancel action
  const cancelCompleteOrder = () => {
    setModalVisible(false); // Close the modal without action
  };
    
  return (
    <ScrollView style={styles.container}>
      
      <BackButton text="Track Order" noMargin={true}/>

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
            trackOrder: true
          }}
        />
        
        {/* Extra req */}
          {parsedData?.service?.extraRequirement && (
            <ExtraReq description={parsedData?.service?.extraRequirement}/>
          )}

        {/* Description Card */}
        <DescriptionCard description={parsedData?.service?.description || "None"}/>

        {/* Complete Order Button */}
        <Pressable style={styles.completeOrderButton} onPress={handleCompleteOrder}>
          <Text style={styles.completeOrderText}>Complete Order</Text>
        </Pressable>

        {/* Confirmation Modal */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={cancelCompleteOrder}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Completion</Text>
              <Text style={styles.modalMessage}>Are you sure you want to complete this order and leave a review?</Text>
              
              <View style={styles.modalButtons}>
                <Pressable style={[styles.modalButton, {backgroundColor: "#E74C3C"}]} onPress={cancelCompleteOrder}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={confirmCompleteOrder}>
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View> 
    </ScrollView>
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
  completeOrderButton: {
    backgroundColor: '#41A48F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  completeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#41A48F',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

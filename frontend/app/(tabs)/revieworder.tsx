import { StyleSheet, Platform, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ServiceItem = {
  serviceName: string;
  quantity: number;
  price: number;
};

type ReceiptCardProps = {
  companyName: string;
  services: ServiceItem[];
  travellingCost: number;
  consultationFee: number;
  commissionRate: number;
};

const ReceiptCard = ({
  companyName,
  services,
  travellingCost,
  consultationFee,
  commissionRate = 0.05,
}: ReceiptCardProps) => {
  const calculateSubtotal = (): number => {
    const serviceTotal = services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
    return serviceTotal + travellingCost + consultationFee;
  };

  const subtotal = calculateSubtotal();
  const commissionFee = subtotal * commissionRate;
  const grandTotal = subtotal + commissionFee;

  const formatPrice = (price: number): string => {
    return `S$${price.toFixed(2)}`;
  };

  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.companyName}>{companyName}</ThemedText>
      {services.map((service, index) => (
        <ThemedView key={index} style={styles.itemRow}>
          <ThemedText>{service.quantity}x {service.serviceName}</ThemedText>
          <ThemedText>{formatPrice(service.price * service.quantity)}</ThemedText>
        </ThemedView>
      ))}
      <ThemedView style={styles.itemRow}>
        <ThemedText>Travelling Cost</ThemedText>
        <ThemedText>{formatPrice(travellingCost)}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.itemRow}>
        <ThemedText>Consultation Fee</ThemedText>
        <ThemedText>{formatPrice(consultationFee)}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.itemRow, styles.subtotalRow]}>
        <ThemedText>Subtotal</ThemedText>
        <ThemedText>{formatPrice(subtotal)}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.itemRow}>
        <ThemedText>Tinkerly Fee ({(commissionRate * 100)}%)</ThemedText>
        <ThemedText>{formatPrice(commissionFee)}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.itemRow, styles.totalRow]}>
        <ThemedText style={styles.totalText}>Grand Total</ThemedText>
        <ThemedText style={styles.totalText}>{formatPrice(grandTotal)}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

// Add types for the booking details
type BookingDetails = {
  date: string;
  time: string;
  duration: string;
};

// Update TimePanel to accept props
const TimePanel = () => {
  return (
    <ThemedView style={styles.timePanel}>
      <ThemedView style={styles.timePanelHeader}>
        <ThemedText style={styles.timePanelTitle}>Booking Details</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.timeDetails}>
        <ThemedView style={styles.timeRow}>
          <Ionicons name="calendar-outline" size={20} color="#41A48F" />
          <ThemedText style={styles.timeText}>Date: March 25, 2024</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.timeRow}>
          <Ionicons name="time-outline" size={20} color="#41A48F" />
          <ThemedText style={styles.timeText}>Time: 2:30 PM</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.timeRow}>
          <Ionicons name="hourglass-outline" size={20} color="#41A48F" />
          <ThemedText style={styles.timeText}>Duration: 2 hours</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40, // Same width as back button for centering title
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : undefined,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalRow: {
    marginBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timePanel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 3 : undefined,
  },
  timePanelHeader: {
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  timePanelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#41A48F',
  },
  timeDetails: {
    gap: 12,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: 15,
    color: '#333',
  },
});

export default function ReviewOrder() {
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#41A48F" />
        </Pressable>
        <ThemedText style={[styles.headerTitle, { color: '#41A48F' }]}>Review Order</ThemedText>
        <View style={styles.placeholder} />
      </ThemedView>

      {/* Receipt Card */}
      <ReceiptCard
        companyName="Example Company"
        services={[]}
        travellingCost={0}
        consultationFee={0}
        commissionRate={0.05}
      />

      {/* Time Panel */}
      <TimePanel />
    </ThemedView>
  );
}

import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ConfirmPaymentMethod ({ }) {
    
    const router = useRouter();

    const paymentMethodPressed = () => {
        router.push('../order/payment');
    }
    
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Confirm Payment Method</Text>
            <Text style={styles.subTitle}>Tinkerly Wallet</Text>
            
            <View style={styles.balanceContainer}>
                <View>
                    <Text style={styles.text}>Current Balance</Text>
                    <Text style={styles.balance}>S$100.00</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={paymentMethodPressed}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === 'android' ? 3 : undefined,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#101828',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 15,
        color: '#101828',
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: '#667085',
    },
    balance: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101828',
    },
    editButton: {
        backgroundColor: '#50A099',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
})
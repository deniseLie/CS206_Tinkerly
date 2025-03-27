import BackButton from "@/components/BackButton";
import CalendarPrice from "@/components/calendarPrice";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";

const BookingScreen = () => {
  
  const router = useRouter();

  const today = moment().format("YYYY-MM-DD");

  // Params
  const { data = null } = useLocalSearchParams();
  const parsedData = data ? JSON.parse(data) : null;
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  

  // Set the selected date
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);  
  };

  // Function: Find service provider
  const findServiceProvider = () => {
    console.log(parsedData)
    if (selectedDate) {
      router.push({
        pathname: "/serviceProvider/serviceProviderBrowse",
        params: {
          data: JSON.stringify({
            selectedDate: selectedDate,
            ...parsedData,
          })
        }
      })
    }
  }

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">

      <BackButton text="Schedule" noMargin={true} isHomeButton={true}/>

      <View style={{ marginTop : 20}} />
      <CalendarPrice
        selectedDate={selectedDate || today}
        onDayPress={onDayPress}
      />

      {/* Find Service Providers Button */}
      <TouchableOpacity 
        style={[
          styles.findButtonContainer,
          !(selectedDate) && styles.disabledBtnContainer
        ]} 
        disabled={!(selectedDate)}
        onPress={findServiceProvider}
      >
        <Text style={[
          styles.findButtonText,
          !(selectedDate) && styles.disabledBtnText
        ]}>
          Find Service Providers
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  
  timeTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
    color: "#41A48F",
  },
  dropdownContainer: {
    marginTop: 10,
    height: 40,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 6,
  },
  dropdownLabel: {
    fontSize: 14,
  },
  dropdownPlaceholder: {
    color: "#a0a0a0",
  },
  findButtonContainer: {
    backgroundColor: "#41A48F",
    padding: 12,
    borderRadius: 15,
    marginTop: 40,
  },
  disabledBtnContainer: {
    backgroundColor: "#C4C4C4",
  },
  findButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
  disabledBtnText: {
    color: '#605E5E'
  }
});

export default BookingScreen;

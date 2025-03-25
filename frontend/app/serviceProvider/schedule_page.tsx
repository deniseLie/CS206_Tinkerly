import BackButton from "@/components/BackButton";
import CalendarPrice from "@/components/calendarPrice";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";

const BookingScreen = () => {
  
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Array.from({ length: 24 * 2 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const time = `${hour % 12 === 0 ? 12 : hour % 12}:${minute} ${hour < 12 ? "AM" : "PM"}`;
      return { 
        label: `${time} - $45`, 
        value: time 
      };
    })
  );

  // Set the selected date
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);  
  };

  // Data for rendering the time slots
  const timeSlotData = items.map(item => ({
    key: item.value,
    label: item.label,
    value: item.value,
  }));

  // Function: Find service provider
  const findServiceProvider = () => {
    if (selectedDate && selectedTime) {
      router.push({
        pathname: "/serviceProvider/serviceProviderBrowse",
        params: {
          data: JSON.stringify({
            selectedDate: selectedDate,
            selectedTime: selectedTime
          })
        }
      })
    }
  }

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">

      <BackButton text="Schedule" noMargin={true}/>

      <CalendarPrice
        selectedDate={selectedDate}
        onDayPress={onDayPress}
      />

      {selectedDate && (
        <View>
          <Text style={styles.timeTitle}>Time</Text>
          <DropDownPicker
            open={open}
            value={selectedTime}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedTime}
            setItems={setItems}
            placeholder="Select a time slot"
            dropDownDirection="BOTTOM"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            labelStyle={styles.dropdownLabel}
            placeholderStyle={styles.dropdownPlaceholder}
            scrollViewProps={{ nestedScrollEnabled: true }}
          />
        </View>
      )}

      {/* Find Service Providers Button */}
      <TouchableOpacity 
        style={[
          styles.findButtonContainer,
          !(selectedDate && selectedTime) && styles.disabledBtnContainer
        ]} 
        disabled={!(selectedDate && selectedTime)}
        onPress={findServiceProvider}
      >
        <Text style={[
          styles.findButtonText,
          !(selectedDate && selectedTime) && styles.disabledBtnText
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

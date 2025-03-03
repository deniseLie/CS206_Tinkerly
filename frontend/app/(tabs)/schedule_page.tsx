import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";

const BookingScreen = () => {
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

  const onDayPress = (day) => {
    console.log(day);  // Log day to console for debugging
    setSelectedDate(day.dateString);  // Set the selected date
  };

  // Data for rendering the time slots
  const timeSlotData = items.map(item => ({
    key: item.value,
    label: item.label,
    value: item.value,
  }));

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
    {/* <FlatList
      data={[1]} 
      renderItem={() => ( */}
        {/* <View style={styles.container}> */}
          <Calendar
            current={"2025-03-01"}
            minDate={"2025-03-01"}
            maxDate={"2025-03-31"}
            onDayPress={onDayPress} 
            dayComponent={({ date, state }) => (
              <TouchableOpacity 
                style={[
                  styles.dayContainer,
                  date.dateString === selectedDate && styles.selectedDayContainer,
                ]} 
                onPress={() => onDayPress(date)} 
                disabled={state === "disabled"}
              >
                <Text
                  style={[
                    styles.dayText,
                    state === "disabled" && styles.disabledDayText,
                    date.dateString === selectedDate && styles.selectedDayText,
                  ]}
                >
                  {date.day}
                </Text>
                <Text style={[
                  styles.calendarPriceText,
                  state === "disabled" && styles.disabledDayText,
                  date.dateString === selectedDate && styles.selectedDayText,
                ]}>
                  ${date.day % 7 === 3 ? 65 : 45}
                </Text>
              </TouchableOpacity >
            )}
            theme={{
              selectedDayBackgroundColor: "#41A48F",
              todayTextColor: "#41A48F",
              arrowColor: "#41A48F",
            }}
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
          <TouchableOpacity style={styles.findButtonContainer} disabled={!(selectedDate && selectedTime)}>
            <Text style={styles.findButtonText}>Find Service Providers</Text>
          </TouchableOpacity>
        </View>
    //     {/* </View> */}
    //   // )}
    // //   keyExtractor={(item) => item.toString()}
    // // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    color: "#41A48F",
  },
  selectedDayContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#41A48F",
  },
  selectedDayText: {
    color: "white",
  },
  disabledDayText: {
    fontWeight: 'normal',
    color: "#a0a0a0", // Gray color for disabled dates
  },
  calendarPriceText: {
    fontSize: 12,
    color: "#E85418", // Orange color for price
    textAlign: "center",
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
  findButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default BookingScreen;

import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

export default function CalendarPrice ({
    selectedDate, onDayPress
}) {
    const today = moment().format("YYYY-MM-DD")
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");

    // Ensure selectedDate is today if it's undefined
    const [currentSelectedDate, setCurrentSelectedDate] = useState(selectedDate || today);

    const handleDayPress = (date) => {
        setCurrentSelectedDate(date.dateString);
        onDayPress(date);
    };

    return (
        <Calendar
            current={today}
            minDate={"2025-04-01"}
            maxDate={"2025-04-31"}
            onDayPress={onDayPress} 
            markedDates={{
                [currentSelectedDate]: { selected: true, selectedColor: "#41A48F" }
            }}
            dayComponent={({ date, state }) => {
                const isTomorrow = date.dateString === tomorrow;
                const price = isTomorrow ? 40 : date.day % 7 === 3 ? 65 : 45;

                return (
                    <TouchableOpacity 
                        style={[
                            styles.dayContainer,
                            date.dateString === currentSelectedDate && styles.selectedDayContainer,
                        ]} 
                        onPress={() => onDayPress(date)} 
                        disabled={state === "disabled"}
                    >
                        <Text
                        style={[
                            styles.dayText,
                            state === "disabled" && styles.disabledDayText,
                            date.dateString === currentSelectedDate && styles.selectedDayText,
                        ]}
                        >
                        {date.day}
                        </Text>
                        <Text style={[
                            styles.calendarPriceText,
                            state === "disabled" && styles.disabledDayText,
                            date.dateString === currentSelectedDate && styles.selectedDayText,
                        ]}>
                            ${price}
                        </Text>
                    </TouchableOpacity >
                )
            }}
            theme={{
                selectedDayBackgroundColor: "#41A48F",
                todayTextColor: "#41A48F",
                arrowColor: "#41A48F",
            }}
        />
    )
}

const styles = StyleSheet.create({
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
})
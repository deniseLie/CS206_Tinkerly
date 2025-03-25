import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarPrice ({
    selectedDate, onDayPress
}) {
    return (
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
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const SearchBar = ({ searchQuery, setSearchQuery, searchPlaceholder }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder ? searchPlaceholder : "Search..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    )
}

const LocationSearchBar = ({ }) => {
    return (
        <View style={styles.locationContainer}>
            <FontAwesome size={25} name="map-marker" color={"#AD4040"}/>
            <Text>Your Location Here</Text>
            <FontAwesome6 size={20} name="chevron-right" color={"gray"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#F1F1F1",
        borderRadius: 15
    },
    locationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        borderColor: '#CFC6C6',
        borderWidth: 1,
        borderRadius: 10
    }
})

export { LocationSearchBar, SearchBar }
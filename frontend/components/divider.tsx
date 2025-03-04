import { StyleSheet, View } from "react-native"

export default function Divider ({ customStyle }) {
    return (
        <View style={[style.divider, customStyle]}>
            <></>
        </View>
    )
}

const style = StyleSheet.create({
    divider: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
    }
})
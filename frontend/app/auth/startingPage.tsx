import { Image, StyleSheet, View } from "react-native"

export default function StartPage () {
    return (
        <View>
            <Image
                source={require('@/assets/images/tinkerly_logo.png')}
                style={styles.reactLogo}
            />
        </View>
    )
}

const style = StyleSheet.create({

})
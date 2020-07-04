import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

export default function CustomTextInput({ onChangeText, style = {}, value, ...rest }) {

    return (
        <View>
            <TextInput onChangeText={onChangeText} value={value} style={[style, styles.textInput]} {...rest} />
        </View>

    )
}

const styles = StyleSheet.create({
    textInput: {
        borderBottomWidth: 1,
        fontSize: 20,

    }
})
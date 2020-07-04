import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { blue, white } from '../utils/color';

export default function PrimaryTextButton({ children, onPress, style = {}, ...props }) {
    return (
        <TouchableOpacity {...props} onPress={onPress}>
            <Text style={[styles.primary, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: blue,
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        color: white,
        marginTop: 10,
        marginBottom: 10
    }
})
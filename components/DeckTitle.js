import React from 'react'
import { View, Text } from 'react-native';
import { gray } from '../utils/color';

export default function DeckTitle({ title, cardsLength }) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>{title}</Text>
            <Text style={{ fontSize: 20, color: gray }}>{`${cardsLength} cards`}</Text>
        </View>
    )
}



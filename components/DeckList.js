import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import { handleRecieveDeck } from '../actions';
import { getDecks } from '../utils/api';
import Deck from './Deck';
import { commonStyles } from '../styles/common';



class DeckList extends Component {
    state = {
        ready: false,
    }
    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then(dispatch(handleRecieveDeck()))
            .then(this.setState(() => ({ ready: true })))



    }
    render() {
        if (this.state.ready === false) {
            return <AppLoading />
        }
        const { deckList, navigation } = this.props
        return (
            <View >
                {deckList !== null && deckList.length > 0 ?
                    deckList.map((deck) => {
                        return <Deck key={deck.title} navigation={navigation} title={deck.title} />
                    })
                    : <Text style={[commonStyles.deck, commonStyles.noDataText]}>There are no decks to display.Please create a new Deck.  </Text>}

            </View>
        )
    }
}


const mapStateToProps = (state) => {

    const deckList = state === undefined ? [] : Object.keys(state).map((key) => state[key])

    return {
        deckList
    }
}

export default connect(mapStateToProps)(DeckList)
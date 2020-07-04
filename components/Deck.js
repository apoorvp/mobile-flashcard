import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import DeckTitle from './DeckTitle';
import { commonStyles } from '../styles/common';

class Deck extends Component {

    render() {
        const { title, questions } = this.props.deckDetail
        return (
            <View style={commonStyles.deck}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'DeckDetails',
                    { title }
                )}>
                    <DeckTitle title={title} cardsLength={questions.length} />
                </TouchableOpacity>
            </View>
        )
    }
}


const mapStateToProps = (state, { title }) => {
    const deckDetail = state[title]

    return {
        deckDetail
    }
}
export default connect(mapStateToProps)(Deck)
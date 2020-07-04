import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DeckTitle from './DeckTitle';
import { white, gray, lightPurp, blue } from '../utils/color';
import PrimaryTextButton from './PrimatyTextButton';
import { commonStyles } from '../styles/common';
import { handleDeleteDeck } from '../actions';

class DeckDetails extends Component {

    deleteDeck = () => {
        const { dispatch, deckDetail } = this.props
        dispatch(handleDeleteDeck(deckDetail.title))
        this.props.navigation.goBack()
    }
    render() {
        const { title, questions } = this.props.deckDetail
        return (
            <View style={commonStyles.deck}>
                <DeckTitle title={title} cardsLength={questions.length} />
                <PrimaryTextButton style={{ marginTop: 40 }} onPress={() => this.props.navigation.navigate(
                    'AddCard',
                    { title }
                )}>
                    <Text> Add Card</Text>
                </PrimaryTextButton>

                <PrimaryTextButton style={styles.quizBtn} onPress={() => this.props.navigation.navigate(
                    'Quiz',
                    { title }
                )}>
                    <Text>Start Quiz</Text>
                </PrimaryTextButton>

                <PrimaryTextButton style={styles.linkBtn} onPress={this.deleteDeck}>
                    <Text>Delete Deck</Text>
                </PrimaryTextButton>
            </View>
        )
    }
}

const mapStateToProps = (state, { route }) => {
    const { title } = route.params
    if (state[title] === undefined) {
        return {
            deckDetail: {
                questions: []
            }
        }
    }
    const deckDetail = state[title]

    return {
        deckDetail
    }
}

const styles = StyleSheet.create({
    quizBtn: {
        color: gray,
        backgroundColor: white,
        borderWidth: 1,
        marginTop: 10
    },
    linkBtn: {
        backgroundColor: white,
        color: blue,
    }

})
export default connect(mapStateToProps)(DeckDetails)
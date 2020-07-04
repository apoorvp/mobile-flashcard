import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { handleSaveDeck } from '../actions'
import CustomTextInput from './CustomTextInput'
import PrimaryTextButton from './PrimatyTextButton'
import { commonStyles } from '../styles/common'


class NewDeck extends Component {

    state = {
        title: ''
    }
    handleSubmitNewDeck = () => {
        const { dispatch, navigation } = this.props
        const { title } = this.state
        this.setState(() => ({ title: '' }))
        dispatch(handleSaveDeck({
            [title]: {
                title: title,
                questions: []
            }
        }))
            .then(() => {
                navigation.navigate('Decks')
            })
    }

    render() {
        const { title } = this.state
        return (
            <View style={commonStyles.deck}>
                <Text style={{ fontSize: 24 }}>What is the title of you new deck?</Text>
                <CustomTextInput multiline style={{ paddingTop: 40 }} value={title} onChangeText={(text) => this.setState({ title: text })} />
                <PrimaryTextButton disabled={title === '' || title === null} style={{ marginTop: 40 }} onPress={this.handleSubmitNewDeck}>
                    <Text>Create Deck</Text>
                </PrimaryTextButton>
            </View>
        )
    }
}

export default connect()(NewDeck)
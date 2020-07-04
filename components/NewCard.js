import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { commonStyles } from '../styles/common'
import CustomTextInput from './CustomTextInput'
import PrimaryTextButton from './PrimatyTextButton'
import { handleAddCard } from '../actions'


class NewCard extends Component {

    state = {
        question: '',
        answer: ''
    }

    handleCardSubmit = () => {
        const { dispatch, title, navigation } = this.props
        const { question, answer } = this.state
        dispatch(handleAddCard(title, { question, answer })).then(() => {
            navigation.goBack()
        })
    }
    render() {
        return (
            <View style={commonStyles.deck}>
                <Text style={{ fontSize: 24 }}>Type your question</Text>
                <CustomTextInput multiline style={{ paddingTop: 40 }}  onChangeText={(text) => this.setState({ question: text })} />
                <Text style={{ fontSize: 24, paddingTop: 20 }}>Register your answer</Text>
                <CustomTextInput multiline style={{ paddingTop: 40 }} onChangeText={(text) => this.setState({ answer: text })} />
                <PrimaryTextButton style={{ marginTop: 40 }} onPress={this.handleCardSubmit}>
                    <Text>Submit</Text>
                </PrimaryTextButton>
            </View>
        )
    }
}

const mapStateToProps = (state, { route }) => {
    const { title } = route.params

    return {
        title
    }
}
export default connect(mapStateToProps)(NewCard)
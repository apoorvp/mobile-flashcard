import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PrimaryTextButton from './PrimatyTextButton'
import { white, blue, green, red } from '../utils/color'


export default class QuestionCard extends Component {

    state = {
        showCorrectAnswer: false
    }

    toggleQuestionAnswer = () => {
        this.setState((state) => ({ showCorrectAnswer: !state.showCorrectAnswer }))
    }
    answerQuestion = (isCorrect) => {
        this.setState(() => ({ showCorrectAnswer: false }))
        this.props.answerQuestion(isCorrect)
    }
    render() {
        const { question } = this.props
        const { showCorrectAnswer } = this.state
        return (
            <View style={{ paddingTop: 20 }} >
                <Text style={styles.question}>{showCorrectAnswer ? question.answer : question.question}</Text>
                <PrimaryTextButton style={styles.linkBtn} onPress={this.toggleQuestionAnswer}>
                    {showCorrectAnswer ? <Text> Show Question</Text>
                        : <Text> Show Correct Answer</Text>}
                </PrimaryTextButton>


                <PrimaryTextButton style={{ marginTop: 20, backgroundColor: green }} onPress={() => this.answerQuestion(true)}>
                    <Text>Correct</Text>
                </PrimaryTextButton>
                <PrimaryTextButton style={{ marginTop: 20, backgroundColor: red }} onPress={() => this.answerQuestion(false)}>
                    <Text>Incorrect</Text>
                </PrimaryTextButton>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    question: {
        fontSize: 24,
        alignSelf: 'center',
        flexWrap: 'wrap',
        marginLeft: 25,
        marginRight: 25
    },
    linkBtn: {
        backgroundColor: white, color: blue, marginTop: 20
    }
})
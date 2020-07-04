import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import QuestionCard from './QuestionCard'
import { commonStyles } from '../styles/common'
import { gray, green, red, white } from '../utils/color'
import PrimaryTextButton from './PrimatyTextButton'
import { clearNotification, setNotitfication } from '../utils/api'

class Quiz extends Component {
    state = {
        correctAnswered: 0,
        currentQuestion: 0,
    }

    answerQuestion = (isCorrect) => {
        this.setState((state) => ({
            currentQuestion: state.currentQuestion + 1,
            correctAnswered: isCorrect ? state.correctAnswered + 1 : state.correctAnswered
        }))
    }

    restartQuiz = () => {
        this.setState(() => ({ correctAnswered: 0, currentQuestion: 0 }))
    }

    render() {
        const { questions, title } = this.props
        const { currentQuestion, correctAnswered } = this.state
        if (questions === null || questions.length === 0) {
            return (<View style={[commonStyles.deck, styles.noDataTextContainter]}>
                <Text style={commonStyles.noDataText}>Sorry you can't take this quiz.Please add the qestions to the deck.</Text>
            </View>)
        }
        if (currentQuestion === questions.length) {
            clearNotification()
            setNotitfication()
            return (
                <View style={[commonStyles.deck, styles.noDataTextContainter]}>
                    <Text style={commonStyles.noDataText}>Correct answers</Text>
                    <Text style={styles.correctAnswerText}>{(correctAnswered / questions.length * 100).toFixed(0)}%</Text>
                    <PrimaryTextButton onPress={this.restartQuiz}>
                        <Text>Start the Quiz Over</Text>
                    </PrimaryTextButton>
                    <PrimaryTextButton style={styles.quizBtn} onPress={() => this.props.navigation.navigate(
                        'DeckDetails',
                        { title }
                    )}>
                        <Text>Back To Deck</Text>
                    </PrimaryTextButton>
                </View>
            )
        }

        return (
            <View style={commonStyles.deck}>
                <Text style={styles.answeredQuestionText}>{`${currentQuestion + 1}/${questions.length}`}</Text>

                <QuestionCard question={questions[currentQuestion]} answerQuestion={this.answerQuestion} />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    answeredQuestionText: {
        fontSize: 16,
        color: gray
    },
    noDataTextContainter: {
        justifyContent: 'flex-start',
    },


    correctAnswerText: {
        color: gray,
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        paddingBottom: 20
    },
    quizBtn: {
        color: gray,
        backgroundColor: white,
        borderWidth: 1,
        marginTop: 10
    }

})
const mapStateToProps = (state, { route }) => {
    const { title } = route.params
    const { questions } = state[title]

    return {
        questions,
        title
    }
}
export default connect(mapStateToProps)(Quiz)
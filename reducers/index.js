import { RECIEVE_DECKS, SAVE_DECK, ADD_CARD, DELETE_DECK } from "../actions";

export default function decks(state = {}, action) {
    switch (action.type) {

        case RECIEVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case SAVE_DECK:
            return {
                ...state, ...action.deck
            }

        case ADD_CARD: {
            const questions = state[action.title] && state[action.title].questions
            return {
                ...state, [action.title]: {
                    title: action.title,
                    questions: !questions ? [action.card] : questions.concat(action.card)
                }
            }
        }
        case DELETE_DECK: {
            const newState = { ...state, [action.title]: undefined }
            delete newState[action.title]
            return {
                ...newState
            }
        }
    }
}
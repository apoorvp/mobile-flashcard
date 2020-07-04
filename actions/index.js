import { getDecks, saveDeckTitle, addCardToDeck, deleteDeck } from "../utils/api"

export const RECIEVE_DECKS = 'RECIEVE_DECKS'
export const SAVE_DECK = 'SAVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'
function recieveDecks(decks) {
    return {
        type: RECIEVE_DECKS,
        decks

    }
}
function saveDeck(deck) {
    return {
        type: SAVE_DECK,
        deck
    }
}

function addCard(title, card) {
    return {
        type: ADD_CARD,
        card,
        title
    }
}

function deleteCardDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}
export function handleRecieveDeck() {
    return (dispatch) => {
        return getDecks().then((result) => {
            dispatch(recieveDecks(result))
        })
    }
}

export function handleSaveDeck(deck) {

    return (dispatch) => {
        return saveDeckTitle(deck.title).then(() => {
            dispatch(saveDeck(deck))
        })
    }

}

export function handleAddCard(title, card) {
    return (dispatch) => {
        return addCardToDeck(title, card).then(() => {
            dispatch(addCard(title, card))
        })
    }
}

export function handleDeleteDeck(title) {
    return (dispatch) => {
        return deleteDeck(title).then(() => dispatch(deleteCardDeck(title)))
    }
}

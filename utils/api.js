import { AsyncStorage } from "react-native"
import * as Permissions from 'expo-permissions'
import { Notifications } from "expo"

const DECK_STORAGE_KEY = 'Flashcards:deck'
const NOTIFICATION_KEY = 'Flashcards:notification'

var dummyDaya = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function getDecks() {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyDaya))
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => JSON.parse(result))
}

export function getDeck(id) {

}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        title: {
            'title': title
        }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((result) => {
        let data = JSON.parse(result);
        data = {
            ...data, [title]: {
                questions: !data[title] || !data[title].questions ? [card] : data[title].questions.concat(card)
            }
        }
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

export function deleteDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
        const data = JSON.parse(results)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })

}
export function clearNotification() {
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    return {
        title: 'Please take the quiz',
        body: "👏 don't forget to take the quiz today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}
export function setNotitfication() {
    AsyncStorage.removeItem(NOTIFICATION_KEY)
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        const tomorrowDate = new Date()
                        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
                        tomorrowDate.setHours(20)
                        tomorrowDate.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrowDate,
                                repeat: 'day',

                            }
                        )
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}

## Project Description

The basic functionality is explained below - :
"Mobile Flashcards" is an android app allows users to study collections of flashcards. 

The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

The app sends notiLogic for notification has been implemented. Notifications are generated at  8:00 PM  daily  if the user hasn't completed at least one quiz for that day.

This application is developed using react,react-native and redux. Also I used react-redux library to connect with the redux store.

Also I used redux-thunk as a middleware.redux-thunk helps in solving the problem of asynchronus calls.

By calling our API in an action creator, we make the action creator responsible for fetching the data it needs to create the action. Since we move the data-fetching code to action creators, we build a cleaner separation between our UI logic and our data-fetching logic. As a result, thunks can then be used to delay an action dispatch, or to dispatch only if a certain condition is met (e.g., a request is resolved).

This app uses expo to access the native apis like notification,location etc

## Testing Environment

This app is tested on android emulator (Pixel_2_API_28) and on the android device using snack

##Available Scripts

### `npm install`

Please use npm install to install the dependecies before running the project

### `npm run andorid`

Before running this command make sure your android emulator is running


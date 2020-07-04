import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants'
import reducers from './reducers'
import DeckList from './components/DeckList';
import thunk from 'redux-thunk';
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';
import Quiz from './components/Quiz';
import { blue, white } from './utils/color';
import NewCard from './components/NewCard';
import { setNotitfication } from './utils/api';



function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator lazy={true}  >
      <Tab.Screen name="Decks" component={DeckList} options={{
        tabBarLabel: 'Decks'
      }} />
      <Tab.Screen name="AddDeck" component={NewDeck} options={{
        tabBarLabel: 'New Deck'
      }} />
    </Tab.Navigator >
  )
}

const Stack = createStackNavigator()

function MainNavigator() {
  return (<Stack.Navigator headerMode='screen'>
    <Stack.Screen name='Home' component={Tabs} options={{ headerShown: false, headerStyle: { backgroundColor: blue }, headerTintColor: white }} />
    <Stack.Screen name='AddCard' component={NewCard} options={{ headerTitle: 'Add Card', headerStyle: { backgroundColor: blue }, headerTintColor: white }} />
    <Stack.Screen name='DeckDetails' component={DeckDetails} options={({ route }) => {
      return {
        title: route.params.title,
        headerStyle: {
          backgroundColor: blue
        },
        headerTintColor: white
      }
    }}
    />
    <Stack.Screen name='Quiz' component={Quiz} options={{ headerStyle: { backgroundColor: blue }, headerTintColor: white }} />
  </Stack.Navigator>
  )
}
export default class App extends Component {
  componentDidMount() {
    setNotitfication()
  }
  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))} >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <AppStatusBar backgroundColor={blue} barStyle='light-content' />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}



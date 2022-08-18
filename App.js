import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NewLink from './NewLink';
import HomeScreen from './Home';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="New"
            component={NewLink}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const Stack = createNativeStackNavigator();

export default App;

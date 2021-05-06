import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import Notes from './screens/Notes'
import NoteDetails from './screens/NoteDetails'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen name="Notes" component={Notes} options={{
          title: 'My Notes',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="NoteDetails" component={NoteDetails} options={{
          title: 'Note Detail',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
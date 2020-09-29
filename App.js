import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import MedForm from './components/MedForm';
import UserMeds from './components/UserMeds';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer initialRouteName='MedSearch'>
          <Stack.Navigator      
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4682b4',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name='MedSearch'
              component={MedForm}
              options={{title: 'Medication Search'}}
            />
            <Stack.Screen
              name='UserMeds'
              component={UserMeds}
              options={{title: 'User Panel'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}



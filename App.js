import React from 'react';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import MedForm from './components/MedForm';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MedForm user={{email: 'ryan@test.com'}} />
      </PaperProvider>
    </Provider>
  );
}



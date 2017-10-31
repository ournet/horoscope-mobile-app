
import { Provider } from 'react-redux';

import * as React from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

import { Config } from '../Config';
import { init } from '../data/config';

init(Config);

import HomePage from './pages/HomePage';
import { configureStore } from './store';

const store = configureStore();
store.dispatch({ type: 'GET_REPORTS_REQUESTED' });

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

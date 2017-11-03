
import { Provider } from 'react-redux';
import * as React from 'react';
import { NetInfo } from 'react-native';

import { Config } from '../Config';

import { configureStore } from './store';
const store = configureStore();
import { configureInteractors } from './interactors';
const interactors = configureInteractors(store);

import HomePage from './pages/HomePage';

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <HomePage interactors={interactors} />
      </Provider>
    );
  }
}

function initUser() {
  return interactors.user.load()
    .then(user => {
      if (!user) {
        return interactors.user.save({ language: Config.CurrentLanguage });
      } else {
        return interactors.user.save({ zodiacSign: null });
      }
    });
}

function init() {
  initUser()
    .then(() => NetInfo.isConnected.fetch())
    .then(isConnected => {
      return interactors.reports.get({})
        .then(reports => {
          if (!reports && !isConnected) {
// Alert.alert()
          }
        });
    });
}

init();

// store.dispatch({ type: 'GET_REPORTS_REQUESTED' });

// throw new Error(JSON.stringify(store.getState()))

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


import { Provider } from 'react-redux';
import * as React from 'react';
import { Config } from './Config';
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

// function initUser() {
//   return interactors.user.load()
//     .then(user => {
//       if (!user) {
//         return interactors.user.save({ language: Config.CurrentLanguage });
//       } else {
//         // return interactors.user.save({ zodiacSign: null });
//       }
//     });
// }

// function init() {
//   return initUser();
// }

// init();

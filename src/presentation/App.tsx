
import { Provider } from 'react-redux';
import * as React from 'react';
import { Config } from './Config';
import { configureStore } from './data/store';
import { Analytics } from './analytics';
import { configureInteractors } from './interactors';

const store = configureStore();
const interactors = configureInteractors(store);

import MainScreen from './screens/MainScreen';

export default class App extends React.Component<{}> {
  constructor(props?: any, context?: any) {
    super(props, context);

    // Analytics.trackPageView('Home');
  }
  render() {
    return (
      <Provider store={store}>
        <MainScreen interactors={interactors} />
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

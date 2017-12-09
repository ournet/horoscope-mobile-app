
import { Provider } from 'react-redux';
import * as React from 'react';
import { Config } from './Config';
import { configureStore } from './data/store';
// import { Analytics } from './analytics';
import { configureInteractors } from './interactors';

const store = configureStore();
const interactors = configureInteractors(store);

import AppScreen from './screens/AppScreen';

export default class App extends React.Component<{}> {
  constructor(props?: any, context?: any) {
    super(props, context);
  }
  render() {
    return (
      <Provider store={store}>
        <AppScreen interactors={interactors} />
      </Provider>
    );
  }
}

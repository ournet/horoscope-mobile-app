
import * as React from 'react';
const OneSignal = require('react-native-onesignal').default;
import { configureInteractors } from './interactors';

const interactors = configureInteractors();

import AppScreen from './screens/AppScreen';
import { Config } from './config';
import { Notifications } from './notifications';

export default class App extends React.Component<{}> {
  constructor(props?: any, context?: any) {
    super(props, context);

    OneSignal.init(Config.OneSignalAppId);
    // OneSignal.setLogLevel(5, 0);

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }
  componentDidMount() {
    Notifications.ensureTags({ lang: Config.CurrentLanguage });
    // OneSignal.getPermissionSubscriptionState((state: any) => console.log(state))
  }
  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  // onReceived(notification: any) {
  //   console.log("Notification received: ", notification);
  // }

  // onOpened(openResult: any) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  // onIds(device: any) {
  //   console.log('Device info: ', device);
  // }

  render() {
    return (
      <AppScreen interactors={interactors} />
    );
  }
}

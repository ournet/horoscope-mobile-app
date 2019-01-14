
import * as React from 'react';
const OneSignal = require('react-native-onesignal').default;
import { configureInteractors } from './interactors';

const interactors = configureInteractors();
import { Config, ValidLanguage } from './config';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { NavigationRouteName } from './navigation';
import SignScreen from './screens/SignScreen';
import ReportsScreen from './screens/ReportsScreen';
import SelectSignScreen from './screens/SelectSignScreen';
import { ViewUser } from './data/user';
import InitScreen from './screens/InitScreen';
import { Styles } from './resources';
// import { Notifications } from './notifications';

const AppNavigator = createStackNavigator({
  [NavigationRouteName.SIGN]: SignScreen,
  [NavigationRouteName.ALL_DAILY_REPORTS]: ReportsScreen,
  [NavigationRouteName.SELECT_SIGN]: SelectSignScreen,
}, {
    initialRouteKey: NavigationRouteName.SIGN,
    cardStyle: {
      backgroundColor: Styles.layoutColor,
    },
    // cardShadowEnabled: false,
    defaultNavigationOptions: {
      headerTintColor: Styles.whiteColor,
      headerStyle: {
        backgroundColor: Styles.accentColor,
        alignContent: 'center',
      },
      headerTitleStyle: {
        color: Styles.whiteColor,
        textAlign: 'center',
      },
      headerBackTitleStyle: {
        color: Styles.whiteColor,
      },
    }
  });

const AppContainer = createAppContainer(AppNavigator);

interface AppState {
  user?: ViewUser
  lang: ValidLanguage
}

export default class App extends React.Component<{}, AppState> {
  constructor(props?: any, context?: any) {
    super(props, context);

    this.state = { lang: Config.CurrentLanguage };

    this.onInitedData = this.onInitedData.bind(this);
    this.onUserUpdated = this.onUserUpdated.bind(this);

    OneSignal.init(Config.OneSignalAppId);
    // OneSignal.setLogLevel(5, 0);

    // OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }
  componentDidMount() {
    // Notifications.ensureTags({ lang: Config.CurrentLanguage });
    // OneSignal.getPermissionSubscriptionState((state: any) => console.log(state))
  }
  componentWillUnmount() {
    // OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }

  // onReceived(notification: any) {
  //   console.log("Notification received: ", notification);
  // }

  onOpened(openResult: any) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);

    return false;
  }

  private onInitedData(user: ViewUser) {
    this.setState({
      user,
      lang: user && user.language || Config.CurrentLanguage,
    });
  }

  private onUserUpdated(nextUser: ViewUser) {
    this.onInitedData(nextUser);
  }

  // onIds(device: any) {
  //   console.log('Device info: ', device);
  // }

  render() {
    const { user, lang } = this.state;
    if (!user) {
      return <InitScreen lang={lang} interactors={interactors} onInited={this.onInitedData}></InitScreen>
    }
    return (
      <AppContainer screenProps={{ interactors, lang, user, onUserUpdated: this.onUserUpdated }}></AppContainer>
    );
  }
}

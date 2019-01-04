
import * as React from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import ReportsScreen from './ReportsScreen';
import StartScreen from './StartScreen';
import SelectSignScreen from './SelectSignScreen';
import SignScreen from './SignScreen';

import { Interactors } from '../interactors';
import { BaseScreenProps } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';
import { Notifications } from '../notifications';
import { NavigationActionTypes } from '../data/navigation/actions';

interface Props extends BaseScreenProps {
    interactors: Interactors
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        navigation: state && state.navigation && state.navigation.route,
        interactors: props.interactors,
    };
};

class MainScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);

        Notifications.ensureTags({ lang: Config.CurrentLanguage });
    }

    componentWillMount() {
        Notifications.onNotificationOpened(() => this.onNotificationOpened());
    }

    private onNotificationOpened() {
        console.log(`got notification`);
        return true;
    }

    getCurrentScreen() {
        const { interactors, navigation } = this.props;
        switch (navigation.key) {
            case NavigationRouteKey.START:
                return <StartScreen interactors={interactors} navigation={navigation} />
            case NavigationRouteKey.REPORTS:
                return <ReportsScreen interactors={interactors} navigation={navigation} />
            case NavigationRouteKey.SELECT_SIGN:
                return <SelectSignScreen interactors={interactors} navigation={navigation} />
            case NavigationRouteKey.SIGN:
                return <SignScreen interactors={interactors} navigation={navigation} />
        }
    }

    render() {
        const screen = this.getCurrentScreen();

        return screen;
    }
}

export default connect<Partial<Props>>(mapStateToProps)(MainScreen) as any;

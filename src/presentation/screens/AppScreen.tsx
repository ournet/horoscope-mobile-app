
import * as React from 'react';

import ReportsScreen from './ReportsScreen';
import SelectSignScreen from './SelectSignScreen';
import SignScreen from './SignScreen';

import { Interactors } from '../interactors';
import { NavigationRouteKey, NavigationRoute } from '../data/navigation/route';
import { User } from '../../domain';
import PromiseComponent, { PromiseComponentResult } from '../components/PromiseComponent';
import { Message } from '../components/Message';
import { Locales } from '../locales';
import { Config } from '../config';
import { ViewUser, ViewUserMapper } from '../data/user';
import { Navigator, INavigator } from '../data/navigation/navigator';
// import {
//     listenOrientationChange as lor,
//     removeOrientationListener as rol
// } from 'react-native-responsive-screen';

interface Props {
    interactors: Interactors
}

interface MainScreenState {
    user?: ViewUser
    currentRoute: NavigationRoute
}

export default class MainScreen extends React.Component<Props, MainScreenState> {
    private navigator: INavigator;
    constructor(props: Props) {
        super(props);

        const currentRoute = {
            key: NavigationRouteKey.START,
        };
        this.onRouteChanged = this.onRouteChanged.bind(this);
        this.onUserUpdated = this.onUserUpdated.bind(this);

        this.navigator = new Navigator(currentRoute);

        this.state = {
            currentRoute,
        };
    }

    componentDidMount() {
        this.navigator.addRouteChangedCallback(this.onRouteChanged);
    }

    componentWillUnmount() {
        this.navigator.removeRouteChangedCallback(this.onRouteChanged);
    }

    onRouteChanged(prev: NavigationRoute, current: NavigationRoute) {
        setImmediate(() => {
            this.setState({
                currentRoute: current,
            });
        });
    }

    getCurrentScreen(user: ViewUser) {
        const { interactors } = this.props;
        const { currentRoute } = this.state;
        const lang = this.getLanguage(user);

        switch (currentRoute.key) {
            case NavigationRouteKey.START:
                setImmediate(() => {
                    if (!user || !user.zodiacSign) {
                        this.navigator.replace({ key: NavigationRouteKey.SELECT_SIGN })
                    } else {
                        this.navigator.replace({ key: NavigationRouteKey.SIGN })
                    }
                });
                break;
            case NavigationRouteKey.REPORTS:
                return <ReportsScreen interactors={interactors} currentRoute={currentRoute} user={user} onUserUpdated={this.onUserUpdated} lang={lang} navigator={this.navigator} />
            case NavigationRouteKey.SELECT_SIGN:
                return <SelectSignScreen interactors={interactors} currentRoute={currentRoute} user={user} onUserUpdated={this.onUserUpdated} lang={lang} navigator={this.navigator} />
            case NavigationRouteKey.SIGN:
                return <SignScreen interactors={interactors} currentRoute={currentRoute} user={user} onUserUpdated={this.onUserUpdated} lang={lang} navigator={this.navigator} />
        }

        return null;
    }

    getLanguage(user: ViewUser) {
        // const { user } = this.state;
        return user && user.language || Config.CurrentLanguage;
    }

    onUserUpdated() {
        const { currentRoute } = this.state;
        setImmediate(() => {
            this.setState({
                user: undefined,
                currentRoute,
            });
        });
        // console.log('Updated user' + JSON.stringify(this.state));
    }

    render() {
        const { user } = this.state;
        // console.log('AppScreen rendering...');
        if (user) {
            // console.log('AppScreen rendering with user: ' + JSON.stringify(user));
            return this.getCurrentScreen(user);
        }
        // console.log('AppScreen rendering without user');
        const lang = this.getLanguage(user);

        return (
            <PromiseComponent<User> promise={this.props.interactors.user.load()}>
                {({ loading, error, data }: PromiseComponentResult<User>) => {
                    if (loading) {
                        return <Message type='info' message={Locales.get('loading', lang)}></Message>
                    }
                    if (error) {
                        return <Message type='danger' message={Locales.get('no_data_error', lang)}></Message>
                    }

                    const user = ViewUserMapper.fromDataUser(data);

                    setImmediate(() => this.setState({
                        user,
                    }));

                    return this.getCurrentScreen(user);
                }}
            </PromiseComponent>
        );
    }
}

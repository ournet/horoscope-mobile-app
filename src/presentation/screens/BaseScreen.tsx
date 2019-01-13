
import * as React from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';

import { Header } from '../components/Header';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { NavigationRoute } from '../data/navigation/route';
import { ViewUser } from '../data/user';
import { INavigator } from '../data/navigation/navigator';
import { ValidLanguage } from '../config';

export type UpdateUserCallback = () => void

export interface BaseScreenProps {
    currentRoute: NavigationRoute
    interactors: Interactors
    user: ViewUser
    onUserUpdated: UpdateUserCallback
    navigator: INavigator
    lang: ValidLanguage
}

export interface HeaderOptions {
    title?: string
    visible?: boolean
}

export interface BaseScreenState {

}

export abstract class BaseScreen<P extends BaseScreenProps, S extends BaseScreenState> extends React.Component<P, S> {
    constructor(props: P, state: S) {
        super(props)
        this.state = state;
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { currentRoute, navigator } = this.props;

        if (currentRoute.previous) {
            navigator.goBack();
        } else {
            BackHandler.exitApp()
        }

        return true;
    }

    onNavigate(route: NavigationRoute) {
        const currentKey = this.props.currentRoute.key;
        const prevKey = this.props.currentRoute.previous && this.props.currentRoute.previous.key;
        if (route.key === currentKey) {
            return;
        }
        if (route.key === prevKey) {
            return this.props.navigator.goBack();
        }
        this.props.navigator.navigate(route);
    }

    render() {
        const content = this.innerRender();
        const body = content.body;
        let header: any = null;
        if (content.header && content.header.visible !== false) {
            header = <Header route={this.props.currentRoute} onNavigate={this.onNavigate.bind(this)} title={content.header.title} />;
        }
        return (
            <View style={styles.container}>
                {header}
                <View style={styles.content}>
                    <ScrollView>
                        {body}
                    </ScrollView>
                </View>
            </View>
        );
    }

    abstract innerRender(): { header: HeaderOptions, body: any }

    // protected actionGetReports(period?: string) {
    //     period = period || convertDateToPeriod(new Date());
    //     const lang = this.props.lang;
    //     return this.props.interactors.reports.get({ period: period, lang: lang });
    // }

    // protected actionGetUser() {
    //     return this.props.interactors.user.load();
    // }

    protected userUpdated() {
        this.props.onUserUpdated();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.layoutColor
    },
    content: {
        marginTop: Styles.paddingSize,
        flex: 1,
    },
    // tabBar: {
    //     flexDirection: 'row',
    //     height: 50
    // },
    // tabBarButton: {
    //     flex: 1
    // },
    // button1: { backgroundColor: '#8BC051' },
    // button2: { backgroundColor: '#CCD948' },
    // button3: { backgroundColor: '#FDE84D' },
    // button4: { backgroundColor: '#FCBF2E' },
    // button5: { backgroundColor: '#FC9626' }
});

import * as React from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { Header } from '../components/Header';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { convertDateToPeriod } from '../utils';
import { NavigationRoute } from '../data/navigation/route';

export interface BaseScreenProps {
    navigation: NavigationRoute
    interactors: Interactors
}

export interface HeaderOptions {
    title?: string
    visible?: boolean
}

export abstract class BaseScreen<P extends BaseScreenProps> extends React.Component<P, State> {
    constructor(props: P, state: State) {
        super(props, state)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { navigation, interactors } = this.props;

        if (navigation.previous) {
            interactors.navigation.goBack()
        } else {
            BackHandler.exitApp()
        }

        return true;
    }

    onNavigate(route: NavigationRoute) {
        const currentKey = this.props.navigation.key;
        const prevKey = this.props.navigation.previous && this.props.navigation.previous.key;
        if (route.key === currentKey) {
            return;
        }
        if (route.key === prevKey) {
            return this.props.interactors.navigation.goBack();
        }
        this.props.interactors.navigation.navigate(route);
    }

    render() {
        const content = this.innerRender();
        const body = content.body;
        let header: any = null;
        if (content.header && content.header.visible !== false) {
            header = <Header route={this.props.navigation} onNavigate={this.onNavigate.bind(this)} title={content.header.title} />;
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

    protected actionGetReports(period?: string) {
        period = period || convertDateToPeriod(new Date());
        const lang = this.state && this.state.user && this.state.user.data.language || Config.CurrentLanguage;
        return this.props.interactors.reports.get({ period: period, lang: lang });
    }

    protected actionGetUser() {
        return this.props.interactors.user.load();
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
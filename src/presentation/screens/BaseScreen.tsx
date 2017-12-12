
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { Header } from '../components/Header';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
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

    render() {
        const content = this.innerRender();
        const body = content.body;
        let header: any = null;
        if (content.header && content.header.visible !== false) {
            header = <Header title={content.header.title} />;
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
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
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
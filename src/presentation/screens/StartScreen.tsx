
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { Message } from '../components/Message';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';

interface Props extends BaseScreenProps {

}

export default class StartScreen extends BaseScreen<Props> {
    constructor(props: Props, state: State) {
        super(props, state);

        const { interactors } = props;

        super.actionGetUser().then((user) => {
            if (!user || !user.zodiacSign) {
                interactors.navigation.replace({ key: NavigationRouteKey.SELECT_SIGN })
            } else {
                interactors.navigation.replace({ key: NavigationRouteKey.SIGN })
            }
        });
    }

    innerRender() {
        const header = { visible: false };

        const body =
            <View style={styles.content}>
                <Message type="info" message={Locales.get('loading')} />
            </View>

        return { header, body };
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
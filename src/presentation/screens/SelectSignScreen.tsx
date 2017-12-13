
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { ZodiacSignSelector } from '../components/ZodiacSignSelector';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';
import { ZodiacSignId } from '../data/entities';

interface Props extends BaseScreenProps {

}

export default class SelectSignScreen extends BaseScreen<Props> {

    onSelectSign(sign: ZodiacSignId) {
        const { interactors } = this.props;
        interactors.user.save({ zodiacSign: sign })
            .then(() => interactors.navigation.replace({ key: NavigationRouteKey.SIGN }))
    }

    innerRender() {
        const header = { title: Locales.get('select_your_sign') };

        const body =
            <ZodiacSignSelector onSelected={this.onSelectSign.bind(this)} />

        return { header, body };
    }
}

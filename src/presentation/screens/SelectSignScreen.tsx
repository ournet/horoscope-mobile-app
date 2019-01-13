
import * as React from 'react';
import { ZodiacSignSelector } from '../components/ZodiacSignSelector';
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps, BaseScreenState } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';
import { ZodiacSignId } from '../data/zodiac-sign';
import { Notifications } from '../notifications';

interface Props extends BaseScreenProps {

}

export default class SelectSignScreen extends BaseScreen<Props, BaseScreenState> {
    constructor(props: Props) {
        super(props, {});

        this.onSelectSign = this.onSelectSign.bind(this);
    }

    onSelectSign(sign: ZodiacSignId) {
        const { interactors } = this.props;
        interactors.user.save({ zodiacSign: sign })
            .then(() => {
                this.userUpdated();
                this.props.navigator.replace({ key: NavigationRouteKey.SIGN });
            });

        Notifications.ensureTags({ zodiacSign: sign.toString() });
        Analytics.trackEvent('settings', 'set-zodiac-sign', { label: 'zodiac-sign', value: sign });
    }

    innerRender() {
        const header = { title: Locales.get('select_your_sign') };

        const body =
            <ZodiacSignSelector onSelected={this.onSelectSign} lang={this.props.lang} />

        return { header, body };
    }
}

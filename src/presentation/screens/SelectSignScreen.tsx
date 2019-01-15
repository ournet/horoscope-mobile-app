
import * as React from 'react';
import { ZodiacSignSelector } from '../components/ZodiacSignSelector';
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps, BaseScreenState, ScreenProps } from './BaseScreen';
import { ZodiacSignId } from '../data/zodiac-sign';
import { Notifications } from '../notifications';
import { NavigationRouteName } from '../navigation';
import { ViewUserMapper } from '../data/user';
import { NavigationScreenProp } from 'react-navigation';

interface SelectSignScreenProps extends BaseScreenProps {

}

export default class SelectSignScreen extends BaseScreen<SelectSignScreenProps, BaseScreenState> {
    static navigationOptions = ({ navigation, screenProps }: { navigation: NavigationScreenProp<{}>, screenProps: ScreenProps }) => {
        return {
            title: Locales.lang(screenProps.lang).select_your_sign(),
        };
    };


    constructor(props: SelectSignScreenProps) {
        super(props, {});

        this.onSelectSign = this.onSelectSign.bind(this);
    }

    onSelectSign(sign: ZodiacSignId) {
        const { interactors, onUserUpdated, lang } = this.props.screenProps;
        const { navigation } = this.props;
        interactors.user.save({ zodiacSign: sign })
            .then((user) => {
                onUserUpdated(ViewUserMapper.fromDataUser(user));
                if (!navigation.goBack()) {
                    navigation.replace(NavigationRouteName.SIGN);
                }
            });

        Notifications.ensureTags({ zodiacSign: sign.toString(), lang: lang });
        Analytics.trackEvent('settings', 'set-zodiac-sign', { label: 'zodiac-sign', value: sign });
    }

    renderScreen() {
        // const header = { title: Locales.get('select_your_sign') };
        const { lang } = this.props.screenProps;

        return <ZodiacSignSelector onSelected={this.onSelectSign} lang={lang} />
    }
}

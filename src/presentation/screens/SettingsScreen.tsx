
import * as React from 'react';
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps, BaseScreenState, ScreenProps } from './BaseScreen';
import { ZodiacSignId } from '../data/zodiac-sign';
import { Notifications } from '../notifications';
import { ViewUserMapper } from '../data/user';
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import { View, Picker, Text } from 'react-native';
import { Sizes } from '../resources/styles';
import { ValidLanguage } from '../languages';
import { Config } from '../config';

interface SelectSignScreenProps extends BaseScreenProps {

}

export default class SelectSignScreen extends BaseScreen<SelectSignScreenProps, BaseScreenState> {
    static navigationOptions = ({ navigation, screenProps }: { navigation: NavigationScreenProp<{}>, screenProps: ScreenProps }) => {
        const options: NavigationScreenOptions = {
            title: Locales.lang(screenProps.lang).settings(),
            drawerLabel: Locales.lang(screenProps.lang).settings(),
        };

        return options;
    };


    constructor(props: SelectSignScreenProps) {
        super(props, {});

        this.onLanguageChanged = this.onLanguageChanged.bind(this);
    }

    onLanguageChanged(nextLang: ValidLanguage) {
        const { interactors, onUserUpdated, user } = this.props.screenProps;
        const { navigation } = this.props;
        interactors.user.save({ language: nextLang, zodiacSign: user.zodiacSign && (user.zodiacSign.id as ZodiacSignId) || undefined })
            .then((user) => {
                onUserUpdated(ViewUserMapper.fromDataUser(user));
                Notifications.ensureTags({ lang: nextLang });
            });
        Analytics.trackEvent('settings', 'set-user-lang');
    }

    renderScreen() {
        // const header = { title: Locales.get('select_your_sign') };
        const { lang } = this.props.screenProps;

        return (
            <View>
                <Text style={{ fontSize: Sizes.font.large, paddingBottom: Sizes.padding.large, paddingTop: Sizes.padding.large, }}>{Locales.lang(lang).change_language()}:</Text>
                <Picker style={{ paddingBottom: Sizes.padding.large }} selectedValue={lang} onValueChange={this.onLanguageChanged}>
                    {Config.SupportedLangs.map(item => <Picker.Item value={item} label={Locales.lang(lang).langByCode(item)}></Picker.Item>)}
                </Picker>
            </View>
        )
    }
}

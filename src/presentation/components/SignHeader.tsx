
import * as React from 'react';
// import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
// import { State } from '../../../data';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { Styles } from '../resources';
import { TabMenu } from './TabMenu';
import { ViewZodiacSign } from '../data/zodiac-sign';
import { formatHeaderDates } from '../helpers';
import { widthPercentage, Sizes } from '../resources/styles';
import { ValidLanguage } from '../languages';

interface Props {
    sign: ViewZodiacSign
    menuOnSelect: (selectedId: string) => void
    menuSelectedId?: string
    signBorgerColor?: string
    lang: ValidLanguage
}

export class SignHeader extends React.PureComponent<Props> {
    render() {

        const styles = StyleSheet.create({
            container: {
                flexDirection: 'column',
                // paddingTop: Styles.paddingSize * 2,
                // paddingBottom: Styles.paddingSize * 2,
                alignItems: 'center',
                justifyContent: 'center',
                // borderBottomWidth: 3,
                // borderBottomColor: Styles.darkLayoutColor,
            },
            menu: {
                marginTop: Styles.paddingSize * 2,
            },
            signIcon: {
                paddingBottom: Styles.paddingSize / 2,
            },
            signName: {
                fontWeight: 'bold',
                fontSize: Sizes.font.large,
                color: Styles.textColor,
            },
            signDate: {
                color: Styles.muteColor,
                fontSize: Sizes.font.medium,
            },
        });

        const { sign, menuOnSelect, menuSelectedId, signBorgerColor, lang } = this.props;

        const dateTabs = formatHeaderDates(lang);

        return (
            <View style={styles.container}>
                <View style={styles.signIcon}>
                    <ZodiacSignIcon borderColor={signBorgerColor} signId={sign && sign.id || null} size={widthPercentage('20%')} />
                </View>
                <Text style={styles.signName}>{sign && sign.name && sign.name.toUpperCase() || '...'}</Text>
                <Text style={styles.signDate}>{sign && sign.date.toString(lang, 'long') || '...'}</Text>
                <View style={styles.menu}>
                    <TabMenu tabs={dateTabs} onSelect={menuOnSelect} selectedId={menuSelectedId} />
                </View>
            </View>
        );
    }
}

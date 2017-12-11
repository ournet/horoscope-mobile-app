
import * as React from 'react';
// import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
// import { State } from '../../../data';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { Styles } from '../resources';
import { convertDateToPeriod } from '../utils';
import { Locales } from '../locales';
import { TabMenu } from './TabMenu';
import { ZodiacSign } from '../data/entities';
import { formatHeaderDates, getMainReportStatsColor } from '../helpers';

interface Props {
    sign: ZodiacSign
    menuOnSelect: (selectedId: string) => void
    menuSelectedId?: string
    signBorgerColor?: string
}

export class SignHeader extends React.PureComponent<Props> {
    render() {
        const { sign, menuOnSelect, menuSelectedId, signBorgerColor } = this.props;

        const dateTabs = formatHeaderDates();

        return (
            <View style={styles.container}>
                <View style={styles.signIcon}>
                    <ZodiacSignIcon borderColor={signBorgerColor} signId={sign && sign.id || null} size={80} />
                </View>
                <Text style={styles.signName}>{sign && sign.name && sign.name.toUpperCase() || '...'}</Text>
                <Text style={styles.signDate}>{sign && sign.date.toString('long') || '...'}</Text>
                <View style={styles.menu}>
                    <TabMenu tabs={dateTabs} onSelect={menuOnSelect} selectedId={menuSelectedId} />
                </View>
            </View>
        );
    }
}

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
        fontSize: 20,
        color: Styles.textColor,
    },
    signDate: {
        color: Styles.muteColor,
        fontSize: 12
    },
});

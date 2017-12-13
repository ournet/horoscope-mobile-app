
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../data/state';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { ZodiacStatsItem } from './ZodiacStatsItem';
import { Styles } from '../resources';
import { createZodiacSign, ZodiacSign } from '../data/entities';
import { HoroscopeReport } from '../../domain';
import { Locales } from '../locales';
import { getMainReportStatsColor, truncateReport } from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ReportItemViewData {
    id: string
    text: string
    sign: ZodiacSign
    numbers: number[]
    stats: {
        health: number
        love: number
        success: number
    }
}

export function createReportItemViewData(report: HoroscopeReport): ReportItemViewData {
    return {
        id: report.id,
        text: report.text,
        sign: createZodiacSign(report.sign),
        numbers: report.numbers,
        stats: report.stats
    }
}

interface ReportItemProps {
    report: ReportItemViewData
    noSign?: boolean
    noStats?: boolean
    noNumbers?: boolean
    truncate?: boolean
}

export class ReportItem extends React.PureComponent<ReportItemProps, State> {
    render() {
        const { sign, numbers, stats, id } = this.props.report;
        const text = this.props.truncate ? truncateReport(this.props.report.text) : this.props.report.text;

        const color = getMainReportStatsColor(stats);

        let statsView: any = null;

        if (stats && this.props.noStats !== true) {
            statsView =
                <View style={styles.stats}>
                    <View key={sign.id + '-health'} style={styles.statsItem}>
                        <ZodiacStatsItem title={Locales.get('health')} value={stats.health} color={Styles.healthColor} />
                    </View>
                    <View key={sign.id + '-love'} style={styles.statsItem}>
                        <ZodiacStatsItem title={Locales.get('love')} value={stats.love} color={Styles.loveColor} />
                    </View>
                    <View key={sign.id + '-success'} style={styles.statsItem}>
                        <ZodiacStatsItem title={Locales.get('success')} value={stats.success} color={Styles.successColor} />
                    </View>
                </View>
        }

        let signView: any = null;
        if (this.props.noSign !== true) {
            signView =
                <View style={styles.sign}>
                    <View style={styles.icon}>
                        <ZodiacSignIcon borderColor={color} signId={sign.id} />
                    </View>
                    <Text style={styles.signTitle}>{sign.name}</Text>
                </View>

        }

        let numbersView: any = null;
        if (id.substr(0, 1) !== 'W' && numbers && numbers.length && this.props.noNumbers !== true) {
            numbersView = numbers.map(no => <View key={sign.id + '-' + no} style={styles.number}><Text style={styles.numberText}>{no}</Text></View>);
            numbersView =
                <View style={styles.numbers}>
                    <Icon name="md-flower" size={26} color={Styles.accentColor} />
                    <Text style={styles.numbersLabel} numberOfLines={1}>{Locales.get('numbers')}:</Text>
                    <View style={styles.numbersData}>{numbersView}</View>
                </View>;
        }

        return (
            <View style={styles.container}>
                {statsView}
                <View style={styles.data}>
                    {signView}
                    <View style={styles.info}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
                {numbersView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // justifyContent: 'flex-start',
        marginBottom: 8,
        // alignItems: 'flex-start'
        borderWidth: 2,
        borderColor: Styles.darkLayoutColor,
        borderRadius: Styles.borderRadius,
    },
    sign: {
        paddingBottom: Styles.paddingSize,
        // justifyContent: 'baseline',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Styles.darkLayoutColor
    },
    signTitle: {
        // paddingTop: Styles.paddingSize,
        color: Styles.textColor,
        fontWeight: 'bold',
    },
    icon: {
        padding: Styles.paddingSize
    },
    data: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    info: {
        flexDirection: 'column',
        backgroundColor: Styles.whiteColor,
        flex: 1,
    },
    text: {
        padding: Styles.paddingSize,
        color: Styles.textColor,
        flex: 1,
        fontSize: 16
    },
    numbers: {
        flexDirection: 'row',
        backgroundColor: Styles.layoutColor,
        padding: Styles.paddingSize,
        // flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numbersLabel: {
        marginLeft: Styles.paddingSize,
        textAlign: 'right',
    },
    numbersData: {
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'center',
        marginLeft: Styles.paddingSize,
    },
    number: {
        marginLeft: Styles.paddingSize,
        width: 26,
        height: 26,
        borderRadius: 26,
        backgroundColor: Styles.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Styles.darkLayoutColor,
    },
    numberText: {
        color: Styles.accentColor,
        fontWeight: 'bold',
        fontSize: 12,
    },
    stats: {
        flexDirection: 'row',
        padding: Styles.paddingSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsItem: {
        marginLeft: Styles.paddingSize,
        marginRight: Styles.paddingSize,
    },
});

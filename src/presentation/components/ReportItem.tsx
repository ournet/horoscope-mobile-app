
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../data/state';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { ZodiacStatsItem } from './ZodiacStatsItem';
import { Styles } from '../resources';
import { createZodiacSign, ZodiacSign } from '../data/entities';
import { HoroscopeReport } from '../../domain';
import { Locales } from '../locales';
import { truncateReport } from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Sizes, widthPercentage } from '../resources/styles';

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
        const numberSize = widthPercentage('7%');
        const signSize = widthPercentage('14%');
        const styles = StyleSheet.create({
            container: {
                flexDirection: 'column',
                // justifyContent: 'flex-start',
                marginBottom: Sizes.padding.medium,
                // alignItems: 'flex-start'
                borderWidth: 2,
                borderColor: Styles.darkLayoutColor,
                borderRadius: Styles.borderRadius,
            },
            sign: {
                paddingBottom: Sizes.padding.medium,
                // justifyContent: 'baseline',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: Styles.layoutColor,
                width: signSize + signSize,
            },
            signTitle: {
                // paddingTop: Styles.paddingSize,
                color: Styles.textColor,
                fontWeight: 'bold',
                fontSize: Sizes.font.medium,
            },
            icon: {
                padding: Sizes.padding.medium,
            },
            data: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
            info: {
                flexDirection: 'column',
                backgroundColor: Styles.whiteColor,
                paddingBottom: Sizes.padding.medium,
                flex: 1,
            },
            text: {
                padding: Sizes.padding.medium,
                paddingBottom: 0,
                color: Styles.textColor,
                flex: 1,
                fontSize: Sizes.font.medium,
            },
            numbers: {
                flexDirection: 'row',
                backgroundColor: Styles.layoutColor,
                padding: Styles.paddingSize,
                // flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                // borderTopWidth: 2,
                // borderTopColor: Styles.darkLayoutColor,
            },
            numbersLabel: {
                marginLeft: Styles.paddingSize,
                textAlign: 'right',
                fontSize: Sizes.font.medium,
            },
            numbersData: {
                flexDirection: 'row',
                // flex: 1,
                justifyContent: 'center',
                marginLeft: Styles.paddingSize,
            },
            number: {
                marginLeft: Sizes.padding.small,
                width: numberSize,
                height: numberSize,
                borderRadius: numberSize,
                backgroundColor: Styles.whiteColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: Styles.darkLayoutColor,
            },
            numberText: {
                color: Styles.accentColor,
                fontWeight: 'bold',
                fontSize: Sizes.font.small,
            },
            stats: {
                flexDirection: 'row',
                padding: Sizes.padding.small,
                justifyContent: 'center',
                alignItems: 'center',
                // borderBottomWidth: 2,
                // borderBottomColor: Styles.darkLayoutColor,
            },
            statsItem: {
                marginLeft: Sizes.padding.small,
                marginRight: Sizes.padding.small,
            },
        });

        const { sign, numbers, stats, id } = this.props.report;
        const text = this.props.truncate ? truncateReport(this.props.report.text) : this.props.report.text;
        const phrases = text.split(/\s*\n\s*/g);

        const texts = phrases.map((item, index) => <Text key={index} style={styles.text}>{item}</Text>);

        // const color = getMainReportStatsColor(stats);

        let statsView: any = null;

        if (stats && this.props.noStats !== true) {
            const signStatSize = widthPercentage('12%');
            statsView =
                <LinearGradient colors={[Styles.lightLayoutColor, Styles.darkLayoutColor]} style={styles.stats}>
                    <View key={sign.id + '-health'} style={styles.statsItem}>
                        <ZodiacStatsItem size={signStatSize} title={Locales.get('health')} value={stats.health} color={Styles.healthColor} />
                    </View>
                    <View key={sign.id + '-love'} style={styles.statsItem}>
                        <ZodiacStatsItem size={signStatSize} title={Locales.get('love')} value={stats.love} color={Styles.loveColor} />
                    </View>
                    <View key={sign.id + '-success'} style={styles.statsItem}>
                        <ZodiacStatsItem size={signStatSize} title={Locales.get('success')} value={stats.success} color={Styles.successColor} />
                    </View>
                </LinearGradient>
        }

        let signView: any = null;
        if (this.props.noSign !== true) {
            signView =
                <View style={styles.sign}>
                    <View style={styles.icon}>
                        <ZodiacSignIcon signId={sign.id} size={signSize} />
                    </View>
                    <Text style={styles.signTitle}>{sign.name}</Text>
                </View>

        }

        let numbersView: any = null;
        if (id.substr(0, 1) !== 'W' && numbers && numbers.length && this.props.noNumbers !== true) {
            numbersView = numbers.map(no => <View key={sign.id + '-' + no} style={styles.number}><Text style={styles.numberText}>{no}</Text></View>);
            numbersView =
                <View style={styles.numbers}>
                    <Icon name="md-flower" size={numberSize} color={Styles.accentColor} />
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
                        {texts}
                    </View>
                </View>
                {numbersView}
            </View>
        );
    }
}


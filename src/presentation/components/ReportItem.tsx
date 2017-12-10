
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../data/state';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { Styles } from '../resources';
import { createZodiacSign, ZodiacSign } from '../data/entities';
import { HoroscopeReport } from '../../domain';

export interface ReportItemViewData {
    id: string
    text: string
    sign: ZodiacSign
}

export function createReportItemViewData(report: HoroscopeReport, truncate: boolean = true): ReportItemViewData {
    return {
        id: report.id,
        text: truncate ? report.text.split(/\n/g)[0].trim() : report.text,
        sign: createZodiacSign(report.sign)
    }
}

interface ReportItemProps {
    report: ReportItemViewData
}

export class ReportItem extends React.PureComponent<ReportItemProps, State> {
    render() {
        const { sign, text } = this.props.report;

        return (
            <View style={styles.container}>
                <View style={styles.sign}>
                    <View style={styles.icon}>
                        <ZodiacSignIcon signId={sign.id} />
                    </View>
                    <Text style={styles.signTitle}>{sign.name}</Text>
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8,
        // alignItems: 'flex-start'
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
        fontWeight: 'bold'
    },
    icon: {
        padding: Styles.paddingSize
    },
    text: {
        backgroundColor: Styles.whiteColor,
        padding: Styles.paddingSize,
        borderTopWidth: 1,
        borderTopColor: Styles.darkLayoutColor,
        borderBottomWidth: 2,
        borderBottomColor: Styles.darkLayoutColor,
        borderRightWidth: 2,
        borderRightColor: Styles.darkLayoutColor,
        color: Styles.textColor,
        flex: 1,
        fontSize: 16
    }
});

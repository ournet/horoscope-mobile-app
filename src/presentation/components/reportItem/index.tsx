
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../../../data';
import { ReportItemViewData } from './ReportItemViewData';
import ZodiacSignIcon from '../zodiacSignIcon';
import { Styles } from '../../resources';

interface ReportItemProps {
    report: ReportItemViewData
}

export default class ReportItem extends React.PureComponent<ReportItemProps, State> {
    render() {
        const { sign, text } = this.props.report;

        return (
            <View style={styles.container}>
                <View style={styles.sign}>
                    <View style={styles.icon}>
                        <ZodiacSignIcon sign={sign.id} />
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


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
        const { report } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <ZodiacSignIcon sign={report.sign} />
                    <Text style={styles.iconTitle}>{report.sign.name}</Text>
                </View>
                <Text style={styles.text}>{report.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: Styles.paddingSize,
        backgroundColor: Styles.whiteColor,
        borderBottomWidth: 1,
        borderBottomColor: Styles.layoutColor
    },
    icon: {
        paddingRight: Styles.paddingSize,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconTitle: {
        paddingTop: Styles.paddingSize,
        color: Styles.textColor,
        fontWeight: 'bold'
    },
    text: {
        color: Styles.textColor,
        flex: 1,
        fontSize: 16
    }
});

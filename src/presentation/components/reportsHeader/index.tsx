
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../../../data';
import ZodiacSignIcon from '../zodiacSignIcon';
import { Styles } from '../../resources';
import { convertNumberToDate } from '../../../domain';
import { momentDate } from '../../utils';

interface Props {
    title: string
    date?: string
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        title: props.title,
        date: props.date || state && state.reports && state.reports.date && momentDate(convertNumberToDate(state.reports.date)).format('ll')
    };
};

class ReportsHeader extends React.PureComponent<Props, State> {
    render() {
        const { title, date } = this.props;

        if (!date) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.date}>
                    <Text style={styles.dateLabel}>{date}</Text>
                </View>
            </View>
        );
    }
}

export default connect<Partial<Props>>(mapStateToProps)(ReportsHeader) as any;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: Styles.paddingSize * 2,
        paddingBottom: Styles.paddingSize * 2,
        alignItems: 'center',
    },
    dateLabel: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    date: {
        backgroundColor: Styles.primaryColor,
        borderRadius: Styles.borderRadius,
        paddingTop: Styles.paddingSize,
        paddingBottom: Styles.paddingSize,
        paddingLeft: Styles.paddingSize * 2,
        paddingRight: Styles.paddingSize * 2,
    },
    title: {
        flex: 1,
        color: Styles.textColor,
        fontWeight: 'bold',
        fontSize: 20
    },
});

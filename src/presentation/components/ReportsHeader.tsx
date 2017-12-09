
import * as React from 'react';
// import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
// import { State } from '../../../data';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { Styles } from '../resources';
import { convertDateToPeriod } from '../utils';
import { Locales } from '../locales';
import { TabMenu } from './TabMenu';

interface Props {
    title: string
    // period: string
    menuOnSelect: (selectedId: string) => void
    menuSelectedId?: string
}

export class ReportsHeader extends React.PureComponent<Props> {
    render() {
        const { title, menuOnSelect, menuSelectedId } = this.props;

        const currentDate = new Date();
        const tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const dateTabs = [
            {
                id: convertDateToPeriod(currentDate),
                text: Locales.get('today')
            },
            {
                id: convertDateToPeriod(tomorrowDate),
                text: Locales.get('tomorrow')
            },
            {
                id: convertDateToPeriod(tomorrowDate, 'W'),
                text: Locales.get('weekly')
            }];

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.menu}>
                    <TabMenu tabs={dateTabs} onSelect={menuOnSelect} selectedId={menuSelectedId} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: Styles.paddingSize * 2,
        marginBottom: Styles.paddingSize * 2,
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    menu: {

    },
    title: {
        flex: 1,
        color: Styles.textColor,
        fontWeight: 'bold',
        fontSize: 20
    },
});

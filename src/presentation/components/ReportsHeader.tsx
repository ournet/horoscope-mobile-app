
import * as React from 'react';
// import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native'
// import { State } from '../../../data';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { Styles } from '../resources';
import { convertDateToPeriod } from '../utils';
import { Locales } from '../locales';
import { TabMenu } from './TabMenu';
import { formatHeaderDates } from '../helpers';

interface Props {
    // title: string
    // period: string
    menuOnSelect: (selectedId: string) => void
    menuSelectedId?: string
}

export class ReportsHeader extends React.PureComponent<Props> {
    render() {
        const { menuOnSelect, menuSelectedId } = this.props;

        const dateTabs = formatHeaderDates();

        return (
            <View style={styles.container}>
                <TabMenu tabs={dateTabs} onSelect={menuOnSelect} selectedId={menuSelectedId} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: Styles.paddingSize * 2,
        marginBottom: Styles.paddingSize * 2,
        alignItems: 'center',
        justifyContent: 'center',
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

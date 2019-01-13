
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReportItem } from './ReportItem';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { Sizes } from '../resources/styles';
import { ViewHoroscopeReport } from '../data/report';

interface ReportsProps {
    items: ViewHoroscopeReport[]
}

export default class Reports extends React.PureComponent<ReportsProps> {
    render() {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                // paddingTop: Styles.paddingSize,
                paddingBottom: Sizes.padding.huge,
            },
            no_data: {
                margin: Styles.paddingSize * 2,
                backgroundColor: Styles.dangerColor,
                padding: Styles.paddingSize,
                borderRadius: Styles.borderRadius,
                alignItems: 'center',
            },
            no_data_text: {
                color: Styles.whiteColor,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Sizes.font.medium,
            },
        });

        const { items } = this.props;

        if (!items || !items.length) {
            return (
                <View style={styles.no_data}>
                    <Text style={styles.no_data_text}>{Locales.get('no_data_error')}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {items.map(item => <ReportItem truncate={true} noNumbers={true} noStats={true} key={item.id} report={item} />)}
            </View>
        );
    }
}

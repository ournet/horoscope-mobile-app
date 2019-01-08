
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { ReportItem } from './ReportItem';
import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { ReportItemViewData, createReportItemViewData } from './ReportItem';
import { ReportsState } from '../../data/reports/state';
import { Sizes } from '../resources/styles';

export interface ReportsViewData {
    items: ReportItemViewData[]
    isLoading: boolean
    error?: string
    period?: string
}

export function createReportsViewData(state: ReportsState): ReportsViewData {
    const viewData: ReportsViewData = { isLoading: state.isLoading, items: [], period: state.period };
    if (state.error) {
        viewData.error = state.error.message;
    }
    else if (state.data && state.data.reports) {
        viewData.items = state.data.reports.map(item => createReportItemViewData(item))
    }
    return viewData;
}

interface ReportsProps extends ReportsViewData {
}

export class Reports extends React.PureComponent<ReportsProps, State> {
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
            loading: {
                margin: Styles.paddingSize * 2,
                backgroundColor: Styles.darkLayoutColor,
                padding: Styles.paddingSize,
                borderRadius: Styles.borderRadius,
                alignItems: 'center',
            },
            loading_text: {
                color: Styles.accentColor,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Sizes.font.medium,
            },
        });

        const { items, error, isLoading } = this.props;

        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <Text style={styles.loading_text}>{Locales.get('loading')}</Text>
                </View>
            );
        }

        if (!items || !items.length || error) {
            return (
                <View style={styles.no_data}>
                    <Text style={styles.no_data_text}>{Locales.get('no_data_error')}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {items.map(item => <ReportItem truncate={true} noNumbers={false} noStats={true} key={item.id} report={item} />)}
            </View>
        );
    }
}

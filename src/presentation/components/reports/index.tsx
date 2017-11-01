
import * as React from 'react';
import { View, Text } from 'react-native'
import { State } from '../../../data';
import { ReportsViewData } from './ReportsViewData';
import ReportItem from '../reportItem';

interface ReportsProps {
    data: ReportsViewData
}

export default class Reports extends React.PureComponent<ReportsProps, State> {
    render() {
        const { items, error, isLoading } = this.props.data;
        if (error) {
            return (
                <View>
                    <Text>Error: {error}</Text>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }

        if (!items || !items.length) {
            return (
                <View>
                    <Text>No reports</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Reports</Text>
                {items.map(item => <ReportItem key={item.id} report={item} />)}
            </View>
        );
    }
}

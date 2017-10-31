
import * as React from 'react';
import { View, Text } from 'react-native'
import { State } from '../../../data';
import { ReportsViewData } from './ReportsViewData';
import ReportItem from '../reportItem';

// interface ReportsProps {
//     items: ReportsViewData
// }

export default class Reports extends React.PureComponent<ReportsViewData, State> {
    render() {
        const { items } = this.props;

        return (
            <View>
                <Text>Reports</Text>
                {items.map(item => <ReportItem key={item.id} report={item} />)}
            </View>
        );
    }
}

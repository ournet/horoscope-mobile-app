
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import { AppState } from '../../data';
import { ReportsViewData, createReportsViewData } from '../components/reports/ReportsViewData';
import Reports from '../components/reports';

interface HomePageProps {
    reports: ReportsViewData
    isLoading: boolean
}

const mapStateToProps = (state: AppState): Partial<HomePageProps> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports.data),
        isLoading: state && state.reports && (state.reports.isLoading !== undefined ? state.reports.isLoading : true)
    };
};

class HomePage extends React.Component<HomePageProps, AppState> {
    render() {
        const { reports, isLoading } = this.props;

        if (isLoading || !reports || !reports.items) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }

        return (
            <Reports items={reports.items} />
        );
    }
}

export default connect<Partial<HomePageProps>>(mapStateToProps)(HomePage);

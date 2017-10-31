
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native'
import { State } from '../../data';
import { ReportsViewData, createReportsViewData } from '../components/reports/ReportsViewData';
import Reports from '../components/reports';

interface HomePageProps {
    reports: ReportsViewData
    isLoading: boolean
    error?: Error
}

const mapStateToProps = (state: State): Partial<HomePageProps> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports.data),
        isLoading: state && state.reports && (state.reports.isLoading !== undefined ? state.reports.isLoading : true),
        error: state && state.reports && state.reports.error
    };
};

class HomePage extends React.Component<HomePageProps, State> {
    render() {
        const { reports, isLoading, error } = this.props;

        if (error) {
            return (
                <View>
                    <Text>Error: {error.message}</Text>
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

        if (reports && reports.items) {
            return (
                <Reports items={reports.items} />
            );
        }

        return (
            <View>
                <Text>No data</Text>
            </View>
        );
    }
}

export default connect<Partial<HomePageProps>>(mapStateToProps)(HomePage);

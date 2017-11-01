
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { State } from '../../data';
import { ReportsViewData, createReportsViewData } from '../components/reports/ReportsViewData';
import Reports from '../components/reports';

interface HomePageProps {
    reports: ReportsViewData
}

const mapStateToProps = (state: State): Partial<HomePageProps> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports)
    };
};

class HomePage extends React.Component<HomePageProps, State> {
    render() {
        const { reports } = this.props;

        return (
            <Reports data={reports} />
        );
    }
}

export default connect<Partial<HomePageProps>>(mapStateToProps)(HomePage);

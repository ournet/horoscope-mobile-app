
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../../data';
import { ReportsViewData, createReportsViewData } from '../components/reports/ReportsViewData';
// import { UserReportViewData, createUserReportViewData } from '../components/userReport/UserReportViewData';
import Header from '../components/header';
import ReportsHeader from '../components/reportsHeader';
import Reports from '../components/reports';
// import UserReport from '../components/userReport';
// import ZodiacSignSelector from '../components/zodiacSignSelector';
import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertNumberToDate } from '../../domain';
import { momentDate } from '../utils';

interface HomePageProps {
    reports?: ReportsViewData
    // userReport?: UserReportViewData
    interactors: Interactors
}

const mapStateToProps = (state: State, props: HomePageProps): Partial<HomePageProps> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports),
        // userReport: state && createUserReportViewData(state),
        interactors: props.interactors
    };
};

class HomePage extends React.Component<HomePageProps, State> {
    render() {
        const { interactors, reports } = this.props;
        const reportsView = reports && <Reports items={reports.items} isLoading={reports.isLoading} error={reports.error} /> || null;

        const headerDate = reports && reports.date && momentDate(convertNumberToDate(reports.date)).format('ll');

        return (
            <View style={styles.container}>
                <Header title={Locales.get('horoscope')} />
                <View style={styles.content}>
                    <ReportsHeader title={Locales.get('today_horoscope')} date={headerDate} />
                    {reportsView}
                </View>
            </View>
        );
    }
}

export default connect<Partial<HomePageProps>>(mapStateToProps)(HomePage) as any;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.layoutColor
    },
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
    },
    tabBar: {
        flexDirection: 'row',
        height: 50
    },
    tabBarButton: {
        flex: 1
    },
    button1: { backgroundColor: '#8BC051' },
    button2: { backgroundColor: '#CCD948' },
    button3: { backgroundColor: '#FDE84D' },
    button4: { backgroundColor: '#FCBF2E' },
    button5: { backgroundColor: '#FC9626' }
});
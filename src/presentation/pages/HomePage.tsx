
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../../data';
import { Config } from '../Config';
import { ReportsViewData, createReportsViewData } from '../components/reports/ReportsViewData';
// import { UserReportViewData, createUserReportViewData } from '../components/userReport/UserReportViewData';
import Header from '../components/header';
import ReportsHeader from '../components/reportsHeader';
import Reports from '../components/reports';
// import UserReport from '../components/userReport';
import ZodiacSignSelector from '../components/zodiacSignSelector';
import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import TabMenu from '../components/tabMenu';
import { Analytics } from '../analytics';

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
    constructor(props: HomePageProps, state: State) {
        super(props, state);

        if (!state || !state.reports) {
            this.changeReportsPeriod(convertDateToPeriod(new Date()));
        }
    }

    changeReportsPeriod(period: string) {
        const lang = this.state && this.state.user && this.state.user.data.language || Config.CurrentLanguage;
        this.props.interactors.reports.get({ period: period, lang: lang });
    }

    onSelectPeriod(period: string) {
        Analytics.trackEvent('User', 'change-period', { label: period.substr(0, 1), value: parseInt(period.substr(1)) });
        return this.changeReportsPeriod(period);
    }

    render() {
        const { interactors, reports } = this.props;
        const reportsView = reports && <Reports items={reports.items} isLoading={reports.isLoading} error={reports.error} /> || null;

        return (
            <View style={styles.container}>
                <Header title={Locales.get('horoscope')} />
                <ZodiacSignSelector />
                <View style={styles.content}>
                    <ReportsHeader title={Locales.get('horoscope')} menuOnSelect={this.onSelectPeriod.bind(this)} menuSelectedId={reports && reports.period} />
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
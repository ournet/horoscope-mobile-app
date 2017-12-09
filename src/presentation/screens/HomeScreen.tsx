
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { Header } from '../components/Header';
import { ReportsHeader } from '../components/ReportsHeader';
import { Reports, ReportsViewData, createReportsViewData } from '../components/Reports';
import { ZodiacSignSelector } from '../components/ZodiacSignSelector';
import { TabMenu } from '../components/TabMenu';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';

interface Props {
    reports?: ReportsViewData
    // userReport?: UserReportViewData
    interactors: Interactors
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports),
        // userReport: state && createUserReportViewData(state),
        interactors: props.interactors
    };
};

class HomeScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
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
            <View style={styles.content}>
                <ReportsHeader title={Locales.get('horoscope')} menuOnSelect={this.onSelectPeriod.bind(this)} menuSelectedId={reports && reports.period} />
                {reportsView}
            </View>
        );
    }
}

export default connect<Partial<Props>>(mapStateToProps)(HomeScreen) as any;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
        backgroundColor: Styles.layoutColor,
    }
});
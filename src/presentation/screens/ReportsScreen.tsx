
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { ReportsHeader } from '../components/ReportsHeader';
import { Reports, ReportsViewData, createReportsViewData } from '../components/Reports';
import { ZodiacSignSelector } from '../components/ZodiacSignSelector';
import { TabMenu } from '../components/TabMenu';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps } from './BaseScreen';

interface Props extends BaseScreenProps {
    reports?: ReportsViewData
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        reports: state && state.reports && createReportsViewData(state.reports),
        interactors: props.interactors,
    };
};

class ReportsScreen extends BaseScreen<Props> {
    constructor(props: Props, state: State) {
        super(props, state);

        if (!state || !state.reports) {
            this.actionGetReports();
        }
    }

    onSelectPeriod(period: string) {
        Analytics.trackEvent('User', 'change-period', { label: period.substr(0, 1), value: parseInt(period.substr(1)) });
        return this.actionGetReports(period);
    }

    innerRender() {
        const { interactors, reports } = this.props;
        const reportsView = reports && <Reports items={reports.items} isLoading={reports.isLoading} error={reports.error} /> || null;

        const header = { title: Locales.get('horoscope') }

        const body =
            <View style={styles.content}>
                <ReportsHeader menuOnSelect={this.onSelectPeriod.bind(this)} menuSelectedId={reports && reports.period} />
                {reportsView}
            </View>

        return { header, body };
    }
}

export default connect<Partial<Props>>(mapStateToProps)(ReportsScreen) as any;

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
});
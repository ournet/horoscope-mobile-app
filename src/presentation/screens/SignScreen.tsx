
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { SignHeader } from '../components/SignHeader';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';
import { ZodiacSign, createZodiacSign } from '../data/entities';
import { ReportsViewData, createReportsViewData } from '../components/Reports';
import { UserState } from '../../data';
import { ReportItem } from '../components/ReportItem';
import { Message } from '../components/Message';
import { getMainReportStatsColor } from '../helpers';

interface Props extends BaseScreenProps {
    user?: UserState
    reports?: ReportsViewData
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        user: state && state.user,
        reports: state && state.reports && createReportsViewData(state.reports),
        // interactors: props.interactors,
    };
};

class SignScreen extends BaseScreen<Props> {
    constructor(props: Props, state: State) {
        super(props, state);

        if (!props.user || !props.user.data || !props.user.data.zodiacSign) {
            props.interactors.navigation.replace({ key: NavigationRouteKey.SELECT_SIGN })
        } else if (!props.reports) {
            this.actionGetReports();
        }
    }

    onSelectPeriod(period: string) {
        Analytics.trackEvent('User', 'change-period', { label: period.substr(0, 1), value: parseInt(period.substr(1)) });
        return this.actionGetReports(period);
    }

    innerRender() {
        const { user, reports } = this.props;

        const header = { title: Locales.get('horoscope') }
        const sign: ZodiacSign = user && user.data && user.data.zodiacSign && createZodiacSign(user.data.zodiacSign);

        const reportItem = sign && reports && reports.items && reports.items.find(item => item.sign.id === sign.id)

        const report = reportItem && <ReportItem noSign={true} report={reportItem} />
        let message = null;
        if (!report) {
            const error = user && user.error || reports && reports.error;
            if (user && user.isLoading || reports && reports.isLoading) {
                message = <Message type="info" message={Locales.get('loading')} />
            } else {
                message = <Message type="danger" message={Locales.get('no_data_error')} />
            }
        }

        const signBorgerColor = reportItem && getMainReportStatsColor(reportItem.stats);

        const body =
            <View style={styles.content}>
                <SignHeader signBorgerColor={signBorgerColor} sign={sign} menuOnSelect={this.onSelectPeriod.bind(this)} menuSelectedId={reports && reports.period} />
                <View style={styles.report}>
                    <ScrollView>
                        {message}
                        {report}
                    </ScrollView>
                </View>
            </View>

        return { header, body };
    }
}

export default connect<Partial<Props>>(mapStateToProps)(SignScreen) as any;

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    report: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Styles.paddingSize,
    },
});
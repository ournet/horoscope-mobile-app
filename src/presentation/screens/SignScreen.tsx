
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { SignHeader } from '../components/SignHeader';;
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps, BaseScreenState } from './BaseScreen';
import { NavigationRouteKey } from '../data/navigation/route';
import { ReportItem } from '../components/ReportItem';
import { Message } from '../components/Message';
import { TabMenu } from '../components/TabMenu';
import { Sizes } from '../resources/styles';
import { convertDateToPeriod } from '../utils';
import PromiseComponent, { PromiseComponentResult } from '../components/PromiseComponent';
import { HoroscopeReports } from '../../domain/entities/HoroscopeReport';
import { ViewHoroscopeReportsMapper } from '../data/report';

interface SignScreenProps extends BaseScreenProps {

}

interface SignScreenState extends BaseScreenState {
    period: string
}

export default class SignScreen extends BaseScreen<SignScreenProps, SignScreenState> {
    constructor(props: SignScreenProps) {
        super(props, {
            period: convertDateToPeriod(new Date()),
        });

        this.onSelectMenuTab = this.onSelectMenuTab.bind(this);
        this.onSelectNavTab = this.onSelectNavTab.bind(this);

        if (!props.user || !props.user.zodiacSign) {
            props.navigator.replace({ key: NavigationRouteKey.SELECT_SIGN });
        }
    }

    onSelectMenuTab(period: string) {
        Analytics.trackEvent('click', 'change-period', { label: period.substr(0, 1), value: parseInt(period.substr(1)) });
        // console.log(`onSelectMenuTab: ${period} - ${this.state.period}`);
        if (period !== this.state.period) {
            this.setState({
                period,
            })
        }
    }
    onSelectNavTab(key: NavigationRouteKey) {
        Analytics.trackEvent('click', 'route', { label: key, value: 1 });
        this.props.navigator.navigate({ key });
    }

    innerRender() {
        const { user } = this.props;

        if (!user || !user.zodiacSign) {
            return null;
        }

        const header = { title: Locales.get('horoscope') }

        const body = this.renderSignBody();

        return { header, body };
    }

    renderSignBody() {
        const { lang, user } = this.props;
        const { period } = this.state;
        const sign = user.zodiacSign;

        const styles = StyleSheet.create({
            content: {
                flex: 1,
                paddingLeft: Sizes.padding.small,
                paddingRight: Sizes.padding.small,
            },
            report: {
                flex: 1,
                flexDirection: 'column',
                marginTop: Sizes.padding.medium,
            },
            footer: {
                paddingTop: Sizes.padding.medium,
                paddingBottom: Sizes.padding.huge,
                // backgroundColor: Styles.primaryColor,
            },
        });

        // const signBorgerColor = reportItem && getMainReportStatsColor(reportItem.stats);

        const navTabs = [
            { text: Locales.get('all_signs'), id: NavigationRouteKey.REPORTS },
            { text: Locales.get('change_sign'), id: NavigationRouteKey.SELECT_SIGN }
        ]

        // console.log('redering sign ' + sign.id + ' ' + period);

        const promise = this.props.interactors.reports.get({ period, lang });

        return (
            <PromiseComponent<HoroscopeReports> promise={promise}>
                {({ loading, error, data }: PromiseComponentResult<HoroscopeReports>) => {
                    if (loading) {
                        return <Message type='info' message={Locales.get('loading', lang)}></Message>
                    }
                    if (error) {
                        return <Message type='danger' message={Locales.get('no_data_error', lang)}></Message>
                    }
                    const reports = ViewHoroscopeReportsMapper.fromData(data, lang);

                    // console.log('got reports, period=' + reports.period);

                    const reportItem = sign && reports && reports.reports && reports.reports.find(item => item.sign.id === sign.id)

                    const report = reportItem && <ReportItem noSign={true} report={reportItem} />
                    let message = null;
                    if (!report) {
                        message = <Message type="danger" message={Locales.get('no_data_error')} />
                    }

                    return (
                        <View style={styles.content}>
                            <SignHeader sign={sign} menuOnSelect={this.onSelectMenuTab} menuSelectedId={period} />
                            <View style={styles.report}>
                                {message}
                                {report}
                            </View>
                            <View style={styles.footer}>
                                <TabMenu tabs={navTabs} onSelect={this.onSelectNavTab} />
                            </View>
                        </View>
                    )
                }}
            </PromiseComponent>
        );
    }
}

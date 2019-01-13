
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReportsHeader } from '../components/ReportsHeader';
import Reports from '../components/Reports';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, BaseScreenProps, BaseScreenState } from './BaseScreen';
import { ViewHoroscopeReportsMapper } from '../data/report';
import { HoroscopeReports } from '../../domain/entities/HoroscopeReport';
import PromiseComponent, { PromiseComponentResult } from '../components/PromiseComponent';
import { Message } from '../components/Message';
import { convertDateToPeriod } from '../utils';


interface Props extends BaseScreenProps {

}

interface State extends BaseScreenState {
    period: string
}

export default class ReportsScreen extends BaseScreen<Props, State> {
    constructor(props: Props) {
        super(props, {
            period: convertDateToPeriod(new Date()),
        });

        this.onSelectPeriod = this.onSelectPeriod.bind(this);
    }

    onSelectPeriod(period: string) {
        Analytics.trackEvent('User', 'change-period', { label: period.substr(0, 1), value: parseInt(period.substr(1)) });
        if (period !== this.state.period) {
            this.setState({ period });
        }
    }

    innerRender() {
        const { lang } = this.props;
        const { period } = this.state;
    

        const header = { title: Locales.get('horoscope') }

        const body = (
            <PromiseComponent<HoroscopeReports> promise={this.props.interactors.reports.get({ period, lang })}>
                {({ loading, error, data }: PromiseComponentResult<HoroscopeReports>) => {
                    if (loading) {
                        return <Message type='info' message={Locales.get('loading', lang)}></Message>
                    }
                    if (error) {
                        return <Message type='danger' message={Locales.get('no_data_error', lang)}></Message>
                    }

                    const reports = ViewHoroscopeReportsMapper.fromData(data, lang);

                    return (
                        <View style={styles.content}>
                            <ReportsHeader menuOnSelect={this.onSelectPeriod} menuSelectedId={period} />
                            <Reports items={reports.reports} />
                        </View>
                    )
                }}
            </PromiseComponent>
        );

        return { header, body };
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
    }
});
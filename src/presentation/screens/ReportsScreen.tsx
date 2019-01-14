
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ReportsHeader } from '../components/ReportsHeader';
import Reports from '../components/Reports';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { Analytics } from '../analytics';
import { BaseScreen, ScreenProps, BaseScreenState, BaseScreenProps } from './BaseScreen';
import { ViewHoroscopeReportsMapper } from '../data/report';
import { HoroscopeReports } from '../../domain/entities/HoroscopeReport';
import PromiseComponent, { PromiseComponentResult } from '../components/PromiseComponent';
import { Message } from '../components/Message';
import { convertDateToPeriod } from '../utils';
import { NavigationScreenProp } from 'react-navigation';


interface ReportsScreenProps extends BaseScreenProps {

}

interface ReportsScreenState extends BaseScreenState {
    period: string
}

export default class ReportsScreen extends BaseScreen<ReportsScreenProps, ReportsScreenState> {
    static navigationOptions = ({ navigation, screenProps }: { navigation: NavigationScreenProp<{}>, screenProps: ScreenProps }) => {
        return {
            title: Locales.get('all_signs', screenProps.lang),
        };
    };


    constructor(props: ReportsScreenProps) {
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

    renderScreen() {
        const { lang, interactors } = this.props.screenProps;
        const { period } = this.state;

        return (
            <PromiseComponent<HoroscopeReports> promise={interactors.reports.get({ period, lang })}>
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
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
    }
});
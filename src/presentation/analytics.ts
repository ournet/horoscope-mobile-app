
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import { Config } from './Config';
const tracker = new GoogleAnalyticsTracker(Config.GoogleAnalyticsId);

interface IAnalytics {
    trackPageView(page: string): void
    trackException(message: string, fatal?: boolean): void
}

export const Analytics: IAnalytics = {
    trackPageView(page: string, props?: { [name: string]: string | number }) {
        tracker.trackScreenView(page);
    },
    trackException(message: string, fatal?: boolean) {
        tracker.trackException(message, fatal === undefined ? false : fatal);
    }
}

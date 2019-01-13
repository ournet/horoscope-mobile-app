
// import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

// GoogleAnalyticsSettings.setDispatchInterval(20);

// const tracker = new GoogleAnalyticsTracker(Config.GoogleAnalyticsId);
// tracker.setAppName(Config.AppName);
// tracker.setAppVersion(Config.AppVersion);
// tracker.setTrackUncaughtExceptions(true);

export enum AnalyticsCategories {
    NOTIFICATION = 'notification',
    NAVIGATION = 'navigation',
}

interface IAnalytics {
    trackPageView(page: string): void
    trackException(message: string, fatal?: boolean): void
    trackEvent(category: string, action: string, value?: { label: string, value: number }): void
    trackNavigation(value: { label: string, value: number }): void
}

export const Analytics: IAnalytics = {
    trackPageView(page: string, props?: { [name: string]: string | number }) {
        // tracker.trackScreenView(page);
    },
    trackException(message: string, fatal?: boolean) {
        // tracker.trackException(message, fatal === undefined ? false : fatal);
    },
    trackEvent(category: string, action: string, value?: { label: string, value: number }) {
        // tracker.trackEvent(category, action, value);
    },
    trackNavigation(value: { label: string, value: number }) {
        // tracker.trackEvent(AnalyticsCategories.NAVIGATION, 'navigate', value);
    },
}


export interface IAnalytics {
    trackException(message: string, fatal?: boolean): void
    trackEvent(category: string, action: string): void
}

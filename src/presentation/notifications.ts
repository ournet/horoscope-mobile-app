import { ZodiacSignId } from "../domain";
import { ValidLanguage } from "./languages";

const OneSignal = require('react-native-onesignal').default;

export type NotificationStatus = {
    userId: string
    notificationsEnabled: boolean
    subscriptionEnabled: boolean
    userSubscriptionEnabled: boolean
}

// export interface INotifications {
//     getStatus():Promise<NotificationStatus>
// }

export class Notifications {
    static getStatus(): Promise<NotificationStatus> {
        return new Promise((resolve) => {
            OneSignal.getPermissionSubscriptionState(resolve);
        });
    }
    static ensureTags(tags: { zodiacSign?: ZodiacSignId, lang?: ValidLanguage }): Promise<boolean> {
        const localTags = { ...tags } as { [key: string]: string }
        for (let prop in localTags) {
            if ([undefined, null].includes(localTags[prop])) {
                delete localTags[prop];
            }
        }
        return new Promise((resolve) => {
            try {
                OneSignal.sendTags(localTags);
            } catch (e) { console.error(e); }
            resolve(true);
        });
    }
    static addNotificationOpened(handler: () => boolean) {
        OneSignal.addEventListener('opened', handler);
    }
    static removeNotificationOpened(handler: () => boolean) {
        OneSignal.removeEventListener('opened', handler);
    }
}
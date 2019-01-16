import { ZodiacSignId } from "../domain";
import { ValidLanguage } from "./languages";

const OneSignal = require('react-native-onesignal').default;

export type NotificationStatus = {
    userId: string
    notificationsEnabled: boolean
    subscriptionEnabled: boolean
    userSubscriptionEnabled: boolean
}

type IndexObject = { [index: string]: string }

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
        const localTags = tags as { [key: string]: string }
        return new Promise((resolve, reject) => {
            OneSignal.getTags((receivedTags: IndexObject) => {
                receivedTags = receivedTags || {};
                const tagsToAdd: IndexObject = {};
                Object.keys(localTags).forEach(tag => {
                    if (receivedTags[tag] !== localTags[tag]) {
                        tagsToAdd[tag] = localTags[tag];
                    }
                });

                if (Object.keys(tagsToAdd).length) {
                    try {
                        OneSignal.sendTags(localTags);
                    } catch (e) { console.error(e); }
                }
                resolve(true);
            });
        });
    }
    static addNotificationOpened(handler: () => boolean) {
        OneSignal.addEventListener('opened', handler);
    }
    static removeNotificationOpened(handler: () => boolean) {
        OneSignal.removeEventListener('opened', handler);
    }
}
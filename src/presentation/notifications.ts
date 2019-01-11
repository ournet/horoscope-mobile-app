
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
    static ensureTags(tags: IndexObject): Promise<boolean> {
        return new Promise((resolve, reject) => {
            OneSignal.getTags((receivedTags: IndexObject) => {
                receivedTags = receivedTags || {};
                const tagsToAdd: IndexObject = {};
                Object.keys(tags).forEach(tag => {
                    if (receivedTags[tag] !== tags[tag]) {
                        tagsToAdd[tag] = tags[tag];
                    }
                });

                if (Object.keys(tagsToAdd).length) {
                    try {
                        OneSignal.sendTags(tags);
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
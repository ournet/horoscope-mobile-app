
import * as React from 'react';
import { Interactors } from '../interactors';
import { ViewUser } from '../data/user';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView, SafeAreaView } from 'react-native';
import { Styles } from '../resources';
import { ValidLanguage } from '../languages';

export type UserUpdatedCallback = (nextUser: ViewUser) => void

export interface BaseScreenProps {
    navigation: NavigationScreenProp<{}>
    screenProps: ScreenProps
}

export interface ScreenProps {
    interactors: Interactors
    user: ViewUser
    lang: ValidLanguage
    onUserUpdated: UserUpdatedCallback
}

export interface BaseScreenState {

}

export abstract class BaseScreen<P extends BaseScreenProps, S extends BaseScreenState> extends React.Component<P, S> {
    constructor(props: P, state: S) {
        super(props)
        this.state = state;
    }

    render() {
        const content = this.renderScreen();
        return (
            <SafeAreaView style={{ backgroundColor: Styles.layoutColor, flex: 1 }}>
                <ScrollView>
                    {content}
                </ScrollView>
            </SafeAreaView>
        )
    }

    abstract renderScreen(): React.ReactNode
}

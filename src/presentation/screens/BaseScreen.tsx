
import * as React from 'react';
import { Interactors } from '../interactors';
import { ViewUser } from '../data/user';
import { NavigationScreenProp } from 'react-navigation';
import { ValidLanguage } from '../config';
import { StyleSheet, View, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Styles } from '../resources';

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
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={Styles.accentColor} barStyle="light-content" translucent={false} />
                <ScrollView>
                    {content}
                </ScrollView>
            </SafeAreaView>
        )
    }

    abstract renderScreen(): React.ReactNode
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.layoutColor
    },
    content: {
        marginTop: Styles.paddingSize,
        flex: 1,
    },
});

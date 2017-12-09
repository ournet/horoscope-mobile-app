
import * as React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { State } from '../data/state';
import { Config } from '../Config';

import { Header } from '../components/Header';
import HomeScreen from './HomeScreen';

import { Interactors } from '../interactors';
import { Styles } from '../resources';
import { Locales } from '../locales';
import { convertDateToPeriod } from '../utils';
import { Analytics } from '../analytics';
import { BaseScreenProps } from './BaseScreenProps';

interface Props extends BaseScreenProps {
    interactors: Interactors
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    return {
        navigation: state && state.navigation && state.navigation.route,
        interactors: props.interactors,
    };
};

class MainScreen extends React.Component<Props, State> {
    // constructor(props: Props, state: State) {
    //     super(props, state);
    // }

    getCurrentScreen() {
        const { interactors, navigation } = this.props;
        switch (navigation.key) {
            case 'HOME':
                return <HomeScreen interactors={interactors} />
        }
    }

    render() {
        const screen = this.getCurrentScreen();

        return (
            <View style={styles.container}>
                <Header title={Locales.get('horoscope')} />
                {screen}
            </View>
        );
    }
}

export default connect<Partial<Props>>(mapStateToProps)(MainScreen) as any;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.layoutColor
    },
    content: {
        flex: 1,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
    },
    tabBar: {
        flexDirection: 'row',
        height: 50
    },
    tabBarButton: {
        flex: 1
    },
    button1: { backgroundColor: '#8BC051' },
    button2: { backgroundColor: '#CCD948' },
    button3: { backgroundColor: '#FDE84D' },
    button4: { backgroundColor: '#FCBF2E' },
    button5: { backgroundColor: '#FC9626' }
});
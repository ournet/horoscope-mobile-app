
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../../../data';
import ZodiacSignIcon from '../zodiacSignIcon';
import { Styles } from '../../resources';

interface Props {
    title: string
}

export default class Header extends React.PureComponent<Props, State> {
    render() {
        const { title } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.button}>Back</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.button}>More</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 30,
        height: 64,
        backgroundColor: Styles.primaryColor
    },
    button: {
        color: '#FFFFFF',
        textAlign: 'center',
        width: 64
    },
    title: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

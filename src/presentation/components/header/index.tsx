
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
                <View style={styles.topline}>
                    <View style={[styles.toplineItem, styles.line1]} />
                    <View style={[styles.toplineItem, styles.line2]} />
                    <View style={[styles.toplineItem, styles.line3]} />
                    <View style={[styles.toplineItem, styles.line4]} />
                    <View style={[styles.toplineItem, styles.line5]} />
                    <View style={[styles.toplineItem, styles.line6]} />
                    <View style={[styles.toplineItem, styles.line7]} />
                    <View style={[styles.toplineItem, styles.line8]} />
                </View>
                {/* <View style={styles.header}>
                    <Text style={styles.button}></Text>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.button}></Text>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    topline: {
        flexDirection: 'row',
        height: 10
    },
    toplineItem: {
        flex: 1
    },
    line1: {
        backgroundColor: '#e46f61'
    },
    line2: {
        backgroundColor: '#875f8d'
    },
    line3: {
        backgroundColor: '#c84697'
    },
    line4: {
        backgroundColor: '#95b464'
    },
    line5: {
        backgroundColor: '#2e9b97'
    },
    line6: {
        backgroundColor: '#db7723'
    },
    line7: {
        backgroundColor: '#6f85bf'
    },
    line8: {
        backgroundColor: '#3d80b9'
    },
    header: {
        flexDirection: 'row',
        // paddingTop: 30,
        height: 44,
        alignItems: 'center',
        backgroundColor: Styles.primaryColor
    },
    button: {
        color: '#FFFFFF',
        textAlign: 'center',
        // width: 44
    },
    title: {
        flex: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

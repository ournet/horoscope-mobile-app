
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { State } from '../data/state';
import { Styles, Images } from '../resources';

const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

interface Props {
    title: string
    // date: string
}

export class Header extends React.PureComponent<Props, State> {
    render() {
        const { title } = this.props;

        const logoPaths = Images.LogoStar.paths.map((item, i) => <Path key={i} d={item.d} fill={item.fill} />);

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
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <Svg x="0" y="0" height="30" width="30" viewBox={Images.OurnetLogo.viewBox}>
                            {logoPaths}
                        </Svg>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.date}>
                        <Text style={styles.dateLabel}>{'...'}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // height: 60
        // backgroundColor: Styles.darkLayoutColor,
    },
    topline: {
        flexDirection: 'row',
        height: 20
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
        // for iOS
        paddingTop: 20,
        height: 30,
        alignItems: 'center',
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
        marginBottom: Styles.paddingSize * 2,
        // backgroundColor: Styles.darkLayoutColor,
    },
    logo: {
        // textAlign: 'center',
        // width: 60,
        // paddingLeft: Styles.paddingSize * 2
    },
    dateLabel: {
        color: Styles.textColor,
        textAlign: 'center'
    },
    date: {
        backgroundColor: Styles.darkLayoutColor,
        borderRadius: Styles.borderRadius,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
    },
    title: {
        flex: 1,
        color: Styles.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
});

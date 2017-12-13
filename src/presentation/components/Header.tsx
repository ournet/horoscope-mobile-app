
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Styles, Images } from '../resources';
import { Locales } from '../locales/index';
import { NavigationRoute, NavigationRouteKey } from '../data/navigation/route';
import Icon from 'react-native-vector-icons/Ionicons';

const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

const LINE_HEIGHT = 30;

interface Props {
    title: string
    route: NavigationRoute
    onNavigate: (route: NavigationRoute) => void
}

interface State {
    openMenu: boolean
}

export class Header extends React.PureComponent<Props, State> {

    constructor(props: Props, state: State) {
        super(props);
        this.state = state || { openMenu: false };
    }

    trigerScreenClick() {
        this.setState({ openMenu: false });
    }

    onClickMenu() {
        this.setState({ openMenu: !this.state.openMenu });
    }

    onClickMenuItem(key: NavigationRouteKey) {
        this.setState({ openMenu: false });
        this.props.onNavigate({ key: key });
    }

    onClickIcon() {
        if (this.props.route.previous) {
            this.props.onNavigate(this.props.route.previous);
        }
    }

    render() {
        const { title, route } = this.props;
        let { openMenu } = this.state;

        let logoView: any = null;
        if (!route.previous) {
            const logoPaths = Images.LogoStar.paths.map((item, i) => <Path key={i} d={item.d} fill={item.fill} />);
            logoView =
                <Svg x="0" y="0" height={LINE_HEIGHT} width={LINE_HEIGHT} viewBox={Images.OurnetLogo.viewBox}>
                    {logoPaths}
                </Svg>
        } else {
            logoView = <Icon name="md-arrow-back" size={LINE_HEIGHT - 2} color={Styles.accentColor} />
        }

        const menu: any = openMenu ? renderMenu(this.onClickMenuItem.bind(this)) : null;

        return (
            <View style={styles.container}>
                <View style={styles.topline}>
                    {/* <View style={[styles.toplineItem, styles.line1]} />
                    <View style={[styles.toplineItem, styles.line2]} />
                    <View style={[styles.toplineItem, styles.line3]} />
                    <View style={[styles.toplineItem, styles.line4]} />
                    <View style={[styles.toplineItem, styles.line5]} />
                    <View style={[styles.toplineItem, styles.line6]} />
                    <View style={[styles.toplineItem, styles.line7]} />
                    <View style={[styles.toplineItem, styles.line8]} /> */}
                </View>
                <View style={styles.header}>
                    <View style={styles.logo} onTouchEnd={this.onClickIcon.bind(this)}>
                        {logoView}
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <View onTouchEnd={() => this.onClickMenu()} style={[styles.buttom, openMenu ? { backgroundColor: Styles.darkLayoutColor } : {}]}>
                        <Icon name="md-more" color={Styles.accentColor} size={LINE_HEIGHT - 2} />
                    </View>
                    {menu}
                </View>
            </View>
        );
    }
}

function renderMenu(onClick: (key: string) => void) {

    return <View style={styles.menu}>
        <TouchableOpacity key='sign' onPress={() => onClick(NavigationRouteKey.SIGN)}>
            <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{Locales.get('home')}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity key='reports' onPress={() => onClick(NavigationRouteKey.REPORTS)}>
            <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{Locales.get('all_signs')}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity key='settings' onPress={() => onClick('settings')}>
            <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{Locales.get('settings')}</Text>
            </View>
        </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    container: {
        // height: 60
        // backgroundColor: Styles.darkLayoutColor,
        overflow: 'visible',
    },
    topline: {
        flexDirection: 'row',
        height: 20,
        backgroundColor: Styles.accentColor,
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
        height: LINE_HEIGHT,
        alignItems: 'center',
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
        marginBottom: Styles.paddingSize * 2,
        // overflow: 'visible',
        position: 'relative',
        // backgroundColor: Styles.darkLayoutColor,
    },
    logo: {
        // textAlign: 'center',
        // width: 60,
        // paddingLeft: Styles.paddingSize * 2
    },
    buttom: {
        // backgroundColor: Styles.darkLayoutColor,
        borderRadius: LINE_HEIGHT,
        width: LINE_HEIGHT,
        height: LINE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        // overflow: 'visible',
    },
    title: {
        flex: 1,
        color: Styles.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    menu: {
        backgroundColor: Styles.whiteColor,
        borderRadius: Styles.borderRadius,
        position: 'absolute',
        top: LINE_HEIGHT + Styles.paddingSize + 2,
        right: Styles.paddingSize,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: Styles.darkLayoutColor,
        // overflow: 'visible',
        zIndex: 2,
    },
    menuItem: {
        // textAlign: 'left',
        paddingRight: Styles.paddingSize,
        paddingLeft: Styles.paddingSize,
        paddingTop: Styles.paddingSize / 2,
        paddingBottom: Styles.paddingSize / 2,
        borderBottomWidth: 1,
        borderBottomColor: Styles.darkLayoutColor,
    },
    menuItemText: {
        textAlign: 'right',
        color: Styles.textColor,
    },
});

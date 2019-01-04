
import * as React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Styles, Images } from '../resources';
import { NavigationRoute } from '../data/navigation/route';
import Icon from 'react-native-vector-icons/Ionicons';
import { accentColor, Sizes } from '../resources/styles';

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

    onClickIcon() {
        if (this.props.route.previous) {
            this.props.onNavigate(this.props.route.previous);
        }
    }

    render() {

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
            header: {

                flexDirection: 'row',
                // for iOS
                paddingTop: Styles.paddingSize,
                // height: LINE_HEIGHT,
                alignItems: 'center',
                paddingLeft: Styles.paddingSize,
                paddingRight: Styles.paddingSize,
                paddingBottom: Styles.paddingSize,
                // overflow: 'visible',
                position: 'relative',
                backgroundColor: Styles.accentColor,
                color: Styles.whiteColor,
            },
            logo: {
                flex: 1,
                // textAlign: 'center',
                // width: 60,
                // paddingLeft: Styles.paddingSize * 2
            },
            title: {
                flex: 3,
                color: Styles.whiteColor,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Sizes.font.medium,
            },
            menu: {
                flex: 1,
                fontSize: 16,
                width: Styles.paddingSize * 2,
            },
        });

        const { title, route } = this.props;
        // let { openMenu } = this.state;

        let logoView: any = null;
        if (!route.previous) {
            const logoPaths = Images.LogoStar.paths.map((item, i) => <Path key={i} d={item.d} fill={Styles.whiteColor} />);
            logoView =
                <Svg x="0" y="0" height={LINE_HEIGHT} width={LINE_HEIGHT} viewBox={Images.OurnetLogo.viewBox}>
                    {logoPaths}
                </Svg>
        } else {
            logoView = <Icon name="md-arrow-back" size={LINE_HEIGHT} accessibilityComponentType="button" color={Styles.whiteColor} />
        }

        // const menu: any = openMenu ? renderMenu(this.onClickMenuItem.bind(this)) : null;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={accentColor} barStyle="light-content" translucent={false} />
                <View style={styles.header}>
                    <View style={styles.logo} onTouchEnd={this.onClickIcon.bind(this)}>
                        {logoView}
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.menu}></View>
                </View>
            </View>
        );
    }
}

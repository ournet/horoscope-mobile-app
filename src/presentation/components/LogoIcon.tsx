import * as React from "react";
import { Images, Styles } from "../resources";
const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

export default class LogoIcon extends React.PureComponent<{}> {

    render() {
        const logoPaths = Images.LogoStar.paths.map((item, i) => <Path key={i} d={item.d} fill={Styles.whiteColor} />);
        return (
            <Svg x="0" y="0" height={'100%'} width={'100%'} viewBox={Images.OurnetLogo.viewBox}>
                {logoPaths}
            </Svg>
        );
    }
}
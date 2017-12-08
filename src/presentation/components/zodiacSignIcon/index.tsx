
import * as React from 'react';
// import { View, Text } from 'react-native'
import { State } from '../../../data';
// import { ZodiacSign as ZodiacSignId } from '../../../domain';
import { ZodiacSignId } from '../../entities';
import { Images, Styles } from '../../resources';
import { View } from 'react-native';
const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

interface ZodiacSignProps {
    sign: ZodiacSignId
    width?: number
    height?: number
    color?: string
    borderColor?: string
    backgroundColor?: string
}

export default class ZodiacSignIcon extends React.PureComponent<ZodiacSignProps, State> {
    render() {
        let { width, height, color, sign, borderColor, backgroundColor } = this.props;
        width = width || 50;
        height = height || width;
        color = color || Styles.accentColor;
        borderColor = borderColor || Styles.darkLayoutColor;
        backgroundColor = backgroundColor || Styles.whiteColor;
        const imageInfo = Images.ZodiacSignImages.one(sign);
        const paths = imageInfo.svg.paths.map((item, i) => <Path key={i} d={item.d} fill={color} fill-rule="evenodd" />);

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height, width,
                borderWidth: 3,
                borderColor,
                borderRadius: width,
                backgroundColor: backgroundColor,
            }}>
                <Svg x="0" y="0" height={height - 18} width={width - 18} viewBox={imageInfo.svg.viewBox}>
                    {paths}
                </Svg>
            </View>
        );
    }
}

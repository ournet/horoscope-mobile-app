
import * as React from 'react';
import { ZodiacSignId } from '../data/zodiac-sign';
import { Images, Styles } from '../resources';
import { View } from 'react-native';

const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

interface ZodiacSignProps {
    signId: ZodiacSignId
    size?: number
    color?: string
    borderColor?: string
    backgroundColor?: string
}

export class ZodiacSignIcon extends React.PureComponent<ZodiacSignProps> {
    render() {
        let { size, color, signId, borderColor, backgroundColor } = this.props;
        size = size || 50;
        color = color || Styles.accentColor;
        borderColor = borderColor || Styles.darkLayoutColor;
        backgroundColor = backgroundColor || Styles.whiteColor;
        const imageInfo = Images.ZodiacSignImages.one(signId);
        let paths: any[] = [];
        if (imageInfo) {
            paths = imageInfo.svg.paths.map((item, i) => <Path key={i} d={item.d} fill={color} fill-rule="evenodd" />);
        }

        const sizeDiff = Math.round((size / 100) * 40);

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: size, width: size,
                borderWidth: 4,
                borderColor,
                borderRadius: size,
                backgroundColor: backgroundColor,
            }}>
                <Svg x="0" y="0" height={size - sizeDiff} width={size - sizeDiff} viewBox={imageInfo && imageInfo.svg.viewBox}>
                    {paths}
                </Svg>
            </View>
        );
    }
}

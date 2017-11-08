
import * as React from 'react';
// import { View, Text } from 'react-native'
import { State } from '../../../data';
// import { ZodiacSign as ZodiacSignId } from '../../../domain';
import { ZodiacSign } from '../../entities';
import { Images, Styles } from '../../resources';
const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Path = SVG.Path;

interface ZodiacSignProps {
    sign: ZodiacSign
    width?: number
    height?: number
    color?: string
}

export default class ZodiacSignIcon extends React.PureComponent<ZodiacSignProps, State> {
    render() {
        let { width, height, color, sign } = this.props;
        width = width || 85;
        height = height || width;
        color = color || Styles.accentColor;
        const imageInfo = Images.ZodiacSignImages.one(sign.id);
        const paths = imageInfo.svg.paths.map((item, i) => <Path key={i} d={item} fill={color}/>);

        return (
            <Svg x="0" y="0" height={height} width={width} viewBox={imageInfo.svg.viewBox}>
                {paths}
            </Svg>
        );
    }
}

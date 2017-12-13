
import * as React from 'react';
import { State } from '../data/state';
import { Images, Styles } from '../resources';
import { View, Text } from 'react-native';

const SVG = require('react-native-svg');
const Svg = SVG.Svg;
const Circle = SVG.Circle;
const SvgText = SVG.Text;

interface Props {
    title?: string
    value: number
    size?: number
    color: string
    backgroundColor?: string
}

export class ZodiacStatsItem extends React.PureComponent<Props> {
    render() {
        let { size, color, title, value, backgroundColor } = this.props;
        size = size || 50;
        const strokeWidth = 5;
        backgroundColor = backgroundColor || Styles.whiteColor;
        let titleView: any = null;
        if (title) {
            titleView = <Text style={{ color: Styles.textColor, paddingTop: 3 }}>{title}</Text>
        }

        const R = size / 2 - strokeWidth;
        const STROKE_MAX = 2 * Math.PI * R;
        const strokeValue = Math.round((STROKE_MAX / 100) * value);

        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // width: size,
            }}>
                <View>
                    <Svg x="0" y="0" height={size} width={size}>
                        <Circle r={R} cx={size / 2} cy={size / 2} stroke={Styles.darkLayoutColor} strokeWidth={strokeWidth} fill={backgroundColor} />
                        <Circle originX={R + strokeWidth} originY={R + strokeWidth} rotate={180} strokeDasharray={[strokeValue, STROKE_MAX]} r={R} cx={size / 2} cy={size / 2} stroke={color} strokeWidth={strokeWidth} fill={backgroundColor} />
                        <SvgText x={size / 2} y={size / 3} textAnchor="middle" color={Styles.textColor} fontSize={15} fontWeight="bold">{value}</SvgText>
                    </Svg>
                </View>
                {titleView}
            </View>
        );
    }
}
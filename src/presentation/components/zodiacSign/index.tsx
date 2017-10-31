
import * as React from 'react';
import { View, Text } from 'react-native'
import { State } from '../../../data';
import { ZodiacSignViewData } from './ZodiacSignViewData';

interface ZodiacSignProps {
    sign: ZodiacSignViewData
}

export default class ZodiacSign extends React.PureComponent<ZodiacSignProps, State> {
    render() {
        const { sign } = this.props;

        return (
            <View>
                <Text>{sign.id}</Text>
                <Text>{sign.name}</Text>
            </View>
        );
    }
}


import * as React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { ZodiacSign, createZodiacSign, ZodiacSignId } from '../data/entities';
import { Styles } from '../resources';
import { ZodiacSignIcon } from './ZodiacSignIcon';

interface Props {
    selectedSign?: ZodiacSignId
    onSelected?: (sign: ZodiacSignId) => void
}

export class ZodiacSignSelector extends React.PureComponent<Props> {
    render() {
        const { selectedSign, onSelected } = this.props;

        function callOnSelected(sign: ZodiacSignId) {
            if (onSelected) {
                onSelected(sign);
            }
        }

        const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id: ZodiacSignId) => {
            const sign = createZodiacSign(id);
            return (
                <TouchableOpacity key={sign.id} onPress={() => callOnSelected(id)}>
                    <View style={styles.signButtom}>
                        <View style={styles.signIcon}>
                            <ZodiacSignIcon width={40} sign={id} />
                        </View>
                        <Text style={styles.signName}>{sign.name}</Text>
                        <Text style={styles.signDate}>{sign.date.toString()}</Text>
                    </View>
                </TouchableOpacity>)
        });

        return (
            <View style={styles.container}>
                {buttons}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around',
        padding: Styles.paddingSize,
    },
    signButtom: {
        width: 100,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: Styles.paddingSize,
        // flexGrow: 1,
    },
    signIcon: {
        paddingBottom: Styles.paddingSize / 2,
    },
    signName: {
        fontWeight: 'bold',
    },
    signDate: {
        color: Styles.muteColor,
        fontSize: 12
    },
});

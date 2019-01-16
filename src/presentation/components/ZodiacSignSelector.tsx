
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { createViewZodiacSign, ZodiacSignId } from '../data/zodiac-sign';
import { Styles } from '../resources';
import { ZodiacSignIcon } from './ZodiacSignIcon';
import { widthPercentage, Sizes } from '../resources/styles';
import { ValidLanguage } from '../languages';

interface Props {
    selectedSign?: ZodiacSignId
    onSelected?: (sign: ZodiacSignId) => void
    lang: ValidLanguage
}

export class ZodiacSignSelector extends React.PureComponent<Props> {

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'space-around',
                padding: Sizes.padding.medium,
            },
            signButtom: {
                // flexBasis: '25%',
                width: widthPercentage('30%'),
                height: widthPercentage('30%'),
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingBottom: Styles.paddingSize,
                flexGrow: 1,
            },
            signIcon: {
                paddingBottom: Sizes.padding.small,
            },
            signName: {
                fontWeight: 'bold',
                fontSize: Sizes.font.medium,
            },
            signDate: {
                color: Styles.muteColor,
                fontSize: Sizes.font.small,
            },
        });

        const { onSelected, lang } = this.props;

        function callOnSelected(sign: ZodiacSignId) {
            if (onSelected) {
                onSelected(sign);
            }
        }

        const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id: ZodiacSignId) => {
            const sign = createViewZodiacSign(id, lang);
            return (
                <TouchableOpacity key={sign.id} onPress={() => callOnSelected(id)}>
                    <View style={styles.signButtom}>
                        <View style={styles.signIcon}>
                            <ZodiacSignIcon size={styles.signButtom.width / 2} signId={id} />
                        </View>
                        <Text style={styles.signName}>{sign.name}</Text>
                        <Text style={styles.signDate}>{sign.date.toString(lang)}</Text>
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

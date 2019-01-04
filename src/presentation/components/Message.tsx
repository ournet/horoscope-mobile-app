
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Styles } from '../resources';
import { Sizes } from '../resources/styles';

interface Props {
    message: string
    type: 'danger' | 'info'
}

export class Message extends React.PureComponent<Props> {
    render() {

        const dangerStyle = StyleSheet.create({
            message: {
                margin: Sizes.padding.huge,
                backgroundColor: Styles.dangerColor,
                padding: Sizes.padding.medium,
                borderRadius: Styles.borderRadius,
                alignItems: 'center',
            },
            text: {
                color: Styles.whiteColor,
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: Sizes.font.medium,
            }
        })

        const infoStyle = StyleSheet.create({
            message: {
                margin: Sizes.padding.huge,
                backgroundColor: Styles.darkLayoutColor,
                padding: Sizes.padding.medium,
                borderRadius: Styles.borderRadius,
                alignItems: 'center',
            },
            text: {
                color: Styles.accentColor,
                textAlign: 'center',
                fontSize: Sizes.font.medium,
            }
        })

        const { message, type } = this.props;
        const style = type === 'danger' ? dangerStyle : infoStyle;
        return (
            <View style={style.message}>
                <Text style={style.text}>{message}</Text>
            </View>
        );
    }
}

// export default connect<Partial<ReportsProps>>(mapStateToProps)(Reports);


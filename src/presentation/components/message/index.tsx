
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Styles } from '../../resources';

interface Props {
    message: string
    type: 'danger' | 'info'
}

export default class Message extends React.PureComponent<Props> {
    render() {
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

const dangerStyle = StyleSheet.create({
    message: {
        margin: Styles.paddingSize * 2,
        backgroundColor: Styles.dangerColor,
        padding: Styles.paddingSize,
        borderRadius: Styles.borderRadius,
        alignItems: 'center',
    },
    text: {
        color: Styles.whiteColor,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

const infoStyle = StyleSheet.create({
    message: {
        margin: Styles.paddingSize * 2,
        backgroundColor: Styles.darkLayoutColor,
        padding: Styles.paddingSize,
        borderRadius: Styles.borderRadius,
        alignItems: 'center',
    },
    text: {
        color: Styles.accentColor,
        textAlign: 'center',
    }
})

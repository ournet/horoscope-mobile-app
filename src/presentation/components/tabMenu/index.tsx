
import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Styles } from '../../resources';

interface Props {
    tabs: { text: string, id: string }[]
    selectedId?: string
    onSelect: (selectedId: string) => void
}

export default class TabMenu extends React.PureComponent<Props> {
    private onPressItem(id: string) {
        this.props.onSelect(id);
    }
    render() {
        const { tabs, selectedId, onSelect } = this.props;
        const tabsView = tabs.map((tab, index) => {
            const style = [styles.item];
            if (tab.id === selectedId) {
                style.push(styles.itemSelected)
            }
            if (index === 0) {
                style.push(styles.itemFirst)
            }
            if (index === tabs.length - 1) {
                style.push(styles.itemLast)
            }

            return (
                <TouchableOpacity key={tab.id} onPress={this.onPressItem.bind(this, tab.id)}>
                    <View style={style}>
                        <Text style={styles.text}>{tab.text}</Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.container}>
                {tabsView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        // marginBottom: Styles.paddingSize,
        // marginRight: Styles.paddingSize,
        // marginLeft: Styles.paddingSize,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 40,
        // borderWidth: 1,
        // borderColor: Styles.accentColor
    },
    item: {
        paddingTop: Styles.paddingSize / 2,
        paddingBottom: Styles.paddingSize / 2,
        paddingLeft: Styles.paddingSize,
        paddingRight: Styles.paddingSize,
        borderColor: Styles.darkLayoutColor,
        borderWidth: 1,
        borderLeftWidth: 0
    },
    itemFirst: {
        borderLeftWidth: 1,
        borderTopLeftRadius: Styles.borderRadius,
        borderBottomLeftRadius: Styles.borderRadius
    },
    itemLast: {
        borderTopRightRadius: Styles.borderRadius,
        borderBottomRightRadius: Styles.borderRadius
    },
    itemSelected: {
        backgroundColor: Styles.darkLayoutColor
    },
    text: {
        color: Styles.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

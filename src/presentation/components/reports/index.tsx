
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { State } from '../../../data';
import { ReportsViewData, createReportsViewData } from './ReportsViewData';
import ReportItem from '../reportItem';
import { Interactors } from '../../interactors';
import { Styles } from '../../resources';
import { Locales } from '../../locales';

interface ReportsProps extends ReportsViewData {
}

// const mapStateToProps = (state: State, props: ReportsProps): Partial<ReportsProps> => {
//     return {
//         data: props.data || state && state.reports && createReportsViewData(state.reports),
//         interactors: props.interactors
//     };
// };

export default class Reports extends React.PureComponent<ReportsProps, State> {
    render() {
        const { items, error, isLoading } = this.props;
        // if (error) {
        //     return (
        //         <View>
        //             <Text>Error: {error}</Text>
        //         </View>
        //     );
        // }

        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <Text style={styles.loading_text}>{Locales.get('loading')}</Text>
                </View>
            );
        }

        if (!items || !items.length || error) {
            return (
                <View style={styles.no_data}>
                    <Text style={styles.no_data_text}>{Locales.get('no_data_error')}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    {items.map(item => <ReportItem key={item.id} report={item} />)}
                </ScrollView>
            </View>
        );
    }
}

// export default connect<Partial<ReportsProps>>(mapStateToProps)(Reports);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Styles.paddingSize,
        // paddingBottom: Styles.paddingSize,
    },
    no_data: {
        margin: Styles.paddingSize * 2,
        backgroundColor: Styles.dangerColor,
        padding: Styles.paddingSize,
        borderRadius: Styles.borderRadius,
        alignItems: 'center',
    },
    no_data_text: {
        color: Styles.whiteColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loading: {
        margin: Styles.paddingSize * 2,
        backgroundColor: Styles.darkLayoutColor,
        padding: Styles.paddingSize,
        borderRadius: Styles.borderRadius,
        alignItems: 'center',
    },
    loading_text: {
        color: Styles.accentColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

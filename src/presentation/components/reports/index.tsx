
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { State } from '../../../data';
import { ReportsViewData, createReportsViewData } from './ReportsViewData';
import ReportItem from '../reportItem';
import { Interactors } from '../../interactors';
import { Styles } from '../../resources';

interface ReportsProps {
    data?: ReportsViewData
    interactors?: Interactors
}

const mapStateToProps = (state: State, props: ReportsProps): Partial<ReportsProps> => {
    return {
        data: props.data || state && state.reports && createReportsViewData(state.reports),
        interactors: props.interactors
    };
};

class Reports extends React.PureComponent<ReportsProps, State> {
    render() {
        if (!this.props.data) {
            return null;
        }
        const { items, error, isLoading } = this.props.data;
        if (error) {
            return (
                <View>
                    <Text>Error: {error}</Text>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }

        if (!items || !items.length) {
            return (
                <View>
                    <Text>No reports</Text>
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

export default connect<Partial<ReportsProps>>(mapStateToProps)(Reports);

const styles = StyleSheet.create({
    container: {
        // paddingTop: Styles.paddingSize,
        // paddingBottom: Styles.paddingSize,
    }
})

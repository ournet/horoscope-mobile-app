
import * as React from 'react';
import { connect } from 'react-redux';
// import { View, Text, Button } from 'react-native'
// import { UserInteractor } from '../../../domain';
import { State } from '../../../data';
import { UserReportViewData, createUserReportViewData } from './UserReportViewData';
import ReportItem from '../reportItem';
// import { Interactors } from '../../interactors';
// temp solution
// import { Instance as interactors } from '../../interactors';

interface UserReportProps {
    data?: UserReportViewData
    // interactors: Interactors
}

const mapStateToProps = (state: State, props: UserReportProps): Partial<UserReportProps> => {
    return {
        data: props.data || state && createUserReportViewData(state)
    };
};

class UserReport extends React.PureComponent<UserReportProps, State> {
    render() {
        const { report } = this.props.data;
        // const userInteractor = this.props.interactors.user;

        // function onSelected() {
        //     userInteractor.save({ zodiacSign: 2 });
        // }

        if (report) {
            return (
                <ReportItem key={report.id} report={report} />
            );
        }

        return null;
    }
}

export default connect<Partial<UserReportProps>>(mapStateToProps)(UserReport);

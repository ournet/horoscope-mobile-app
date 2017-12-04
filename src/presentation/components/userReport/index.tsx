
import * as React from 'react';
// import { connect } from 'react-redux';
// import { View, Text, Button } from 'react-native'
// import { UserInteractor } from '../../../domain';
import { State } from '../../../data';
import { UserReportViewData, createUserReportViewData } from './UserReportViewData';
import ReportItem from '../reportItem';
// import { Interactors } from '../../interactors';
// temp solution
// import { Instance as interactors } from '../../interactors';

interface UserReportProps extends UserReportViewData {

}

// const mapStateToProps = (state: State, props: UserReportProps): Partial<UserReportProps> => {
//     return {
//         data: props.data || state && createUserReportViewData(state)
//     };
// };

export default class UserReport extends React.PureComponent<UserReportProps, State> {
    render() {
        const { report } = this.props;
        // const userInteractor = this.props.interactors.user;

        // function onSelected() {
        //     userInteractor.save({ zodiacSign: 2 });
        // }

        if (report) {
            return (
                <ReportItem report={report} />
            );
        }

        return null;
    }
}

// export default connect<Partial<UserReportProps>>(mapStateToProps)(UserReport);

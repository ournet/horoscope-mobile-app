
import { ZodiacSign } from '../../entities';
import { ReportItemViewData, createReportItemViewData } from '../reportItem/ReportItemViewData';
import { State } from '../../../data/state';

export interface UserReportViewData {
    report?: ReportItemViewData
    isLoading: boolean
    zodiacSign?: ZodiacSign
}

export function createUserReportViewData(state: State): UserReportViewData {
    const viewData: UserReportViewData = { isLoading: state.reports && state.reports.isLoading };

// if(state.app)

//     else if (state.data && state.data.reports) {
//         viewData.items = state.data.reports.map(createReportItemViewData)
//     }
    return viewData;
}


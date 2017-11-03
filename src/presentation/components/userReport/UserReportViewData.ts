
import { ZodiacSign, createZodiacSign } from '../../entities';
import { ReportItemViewData, createReportItemViewData } from '../reportItem/ReportItemViewData';
import { State } from '../../../data/state';

export interface UserReportViewData {
    report?: ReportItemViewData
    isLoading: boolean
    zodiacSign?: ZodiacSign
    texts: {
        selectYourZodiacSign: string
    }
}

export function createUserReportViewData(state: State): UserReportViewData {
    const viewData: UserReportViewData = {
        isLoading: state.user && state.user.isLoading,
        texts: {
            selectYourZodiacSign: 'Select your zodiac sign:'
        }
    };
    const zodiacSignId = state.user && state.user.data && state.user.data.zodiacSign;
    if (zodiacSignId) {
        viewData.zodiacSign = createZodiacSign(zodiacSignId);
    }

    if (viewData.zodiacSign) {
        if (state.reports && state.reports.data) {
            const report = state.reports.data.reports.find(item => item.sign === zodiacSignId);
            if (report) {
                viewData.report = createReportItemViewData(report);
            }
        }
    }

    return viewData;
}



import { ZodiacSign, createZodiacSign } from '../../entities';
import { UserState } from '../../../data';
import { ZodiacSignImage, ZodiacSignImages } from '../../resources';

export interface ViewData {
    zodiacSign?: ZodiacSign
    texts: {
        selectYourZodiacSign: string
    },
    zodiacSignsImages: ZodiacSignImage[]
}

export function createViewData(state: UserState): ViewData {
    const viewData: ViewData = {
        zodiacSign: state && state.data && state.data.zodiacSign && createZodiacSign(state.data.zodiacSign),
        texts: {
            selectYourZodiacSign: 'Select your zodiac sign:'
        },
        zodiacSignsImages: ZodiacSignImages.list()
    };

    return viewData;
}


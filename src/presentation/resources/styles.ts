import {
    widthPercentageToDP as widthPercentage,
    heightPercentageToDP as heightPercentage,
} from 'react-native-responsive-screen';

export { widthPercentage, heightPercentage }

export const primaryColor = '#1EAAF1';
export const accentColor = '#c84697';
export const textColor = '#333333';
export const layoutColor = '#f2f0ea';
export const lightLayoutColor = '#f8f7f4';
export const darkLayoutColor = '#e2ded1';
export const whiteColor = '#ffffff';
export const muteColor = '#888';
export const dangerColor = accentColor;
export const healthColor = '#96c557';
export const loveColor = '#ed69da';
export const successColor = '#2199e8';//'#e8d657';

export const paddingSize = 10;
export const borderRadius = 3;

export interface IStyleSizes {
    readonly tiny: number
    readonly small: number
    readonly medium: number
    readonly large: number
    readonly huge: number
}

class StyleSizes implements IStyleSizes {
    constructor(private pertanges: { tiny: string, small: string, medium: string, large: string, huge: string }, private fn: (p: string) => number) { }

    get tiny() { return this.fn(this.pertanges.tiny) }
    get small() { return this.fn(this.pertanges.small) }
    get medium() { return this.fn(this.pertanges.medium) }
    get large() { return this.fn(this.pertanges.large) }
    get huge() { return this.fn(this.pertanges.huge) }
}

export const Sizes: { readonly padding: IStyleSizes, readonly font: IStyleSizes } = {
    padding: new StyleSizes({ tiny: '1', small: '2', medium: '3', large: '4', huge: '5' }, widthPercentage),
    font: new StyleSizes({ tiny: '1.6', small: '2', medium: '2.8', large: '3.6', huge: '4' }, heightPercentage),
}

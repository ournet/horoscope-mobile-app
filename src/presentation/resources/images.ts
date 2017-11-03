
import { ZodiacSign } from '../../domain';

export type SvgInfo = {
    paths?: string[]
}

export type ZodiacSignImage = {
    readonly id: ZodiacSign
    readonly src?: string
    readonly svg?: SvgInfo
}

function createZodiacSignImages() {
    const map: { [index: number]: ZodiacSignImage } = {
        1: {
            id: 1,
            svg: {
                paths: ['M22.4 20.86s-2.27-.52-2.52-1.3c-.24-.77.43-1.77.97-1.5s.73 1.38 1.73 1.77 3.34-2.87 3.6-3.7l.37-1.3s8.33-5.45 0-13.62C25.9.7 20.2-2.1 16 3.4c-.48.77-4.67 8.64 1.7 10.46 7.4 2.1 8.32-8.12 4-6.8 1.26 1.65 1 4.3-1.96 3.18-2.03-1.26.22-4.07.22-4.07s1.3-2.2 3.75-1.06c1.5.65 5.2 6.04-1.4 9.63-10.7 3.2-10-6.84-10-6.84s-1.3-2-2.6-1.07c1.07.93 2 2.2.6 2.16-1.96-.78-7.15 1.6-8.13 2.53 3.4.8 10.88 14.33 11.56 20.9.7-.04 1.2-7.52-.4-10.8-.73-1.08-3.93-3.23-.92-6.86.6.08-2.84 2.6 2.98 5.6-.57 1.13-1.3 5.08.6 6.2 1.95 1.12 3.63-5.1 6.5-5.68']
            }
        },
        2: {
            id: 2,
            svg: {
                paths: ['M25.05 0c1.3 7.96-1.5 7.64-1.5 7.64l-7.5-.28h-.1l-7.5.28s-2.8.32-1.5-7.64c-9.2 13 2.95 11.03 3.13 11.5.18.46-1.84 3.2-1.7 4.82.15 1.62 2.98 2.5 3.36 3.57 1.24 3.6-2.7 7.2.97 8.1l.5.1v.62c0 1.74 1.43 3.17 3.18 3.17s3.18-1.44 3.18-3.18c0-.28-.03-.55-.1-.8 3.6-.93-.3-4.5.93-8.15.36-1.1 3.2-1.95 3.34-3.58s-1.87-4.37-1.7-4.83c.2-.45 12.33 1.5 3.14-11.5zm-8.8 31.14c-1.26 0-2.3-1.04-2.3-2.3 0-.2.03-.36.07-.52.85.12 1.63.2 1.92.2v.02h.12c.35-.03 1.4-.12 2.42-.3.05.18.1.38.1.6 0 1.26-1.05 2.3-2.32 2.3z']
            }
        },
        3: {
            id: 3,
            svg: {
                paths: ['M28.56 2.6c-2.92-4.98-6.7-1.47-7.44-.4-.74 1.07-1.2 4.03-1.2 4.03s1.73.5 1.76.85c.03.36-1.96.77-1.96.77s-.03.3-.26.83c-.28.7-3 2.07-3.13 2.9-.18 1.2 1.55.94 1.56 1.5l-.1 1.04c-.1.04-.6.46-.5.83 0 .42.5.56.5.56s-.6.6-.4.9c.1.3.8.3 1 .4s.1.8-.1 1c-.2.2-.9.66-.58 1.7.37 1 .74 1.37 4.6.9 1.4 3.75-2.96 5.23-4.53 5.77-.7.24-1.43 1.46-1.9 2.73-.48-1.3-1.2-2.5-1.9-2.76-1.57-.53-5.95-2-4.55-5.77 3.9.46 4.24.1 4.6-.9.36-1.05-.33-1.5-.54-1.7-.23-.2-.2-.84-.07-.96.12-.1.85-.05 1-.34.13-.3-.43-.87-.43-.87s.48-.14.5-.56c.1-.4-.4-.8-.5-.85v-1.1c0-.57 1.76-.3 1.58-1.5-.1-.84-2.84-2.2-3.13-2.9-.2-.54-.24-.84-.24-.84s-2-.4-1.94-.77c.02-.4 1.75-.9 1.75-.9s-.47-3-1.2-4.08c-.75-1.07-4.5-4.58-7.45.4C-.45 9.3-.2 13.5 1.15 19.5c.3 1.17 1.04 3.24 1.54 4.36.7-.9 3.1-2.76 5.3-15.76-.5 12.2-5.1 16.2-4.9 16.4 2.3 3.8 6.4 7.03 12.8 7.44h.2c6.4-.45 10.52-3.7 12.8-7.5.14-.23-4.44-4.2-4.88-16.43 2.12 13 4.52 14.9 5.3 15.8.5-1.1 1.24-3.2 1.5-4.32 1.4-6 1.66-10.23-2.3-16.95z']
            }
        },
        4: {
            id: 4,
            svg: {
                paths: ['M25.52 21.95c.56-.04 5.7-.18 6.28-2.96.05-.25-.08-.8-.37-.46-3.48 2.1-6.62-.84-6.62-.84s5.54-5.1 4.67-9.9C28.6 3.03 21.2-1.2 19 .33c3.36 1.83 5.27 6.27 5.27 6.27s-2.57.44-5.28-2c-1 5.45 5.55 5.8 6.66 5.96.74.1-1.55 4.25-2.36 5.05-.1.1-.13.2-.15.3-.96-.54-3.94-2.12-7.16-2.12-3.2 0-6.2 1.58-7.18 2.14-.02-.1-.06-.2-.16-.3-.8-.8-3.1-4.94-2.36-5.04 1.1-.15 7.67-.5 6.7-5.97-2.7 2.45-5.3 2-5.3 2S9.66 2.15 13.04.3C10.84-1.23 3.44 3 2.56 7.8c-.87 4.8 4.64 9.9 4.64 9.9s-3.15 2.93-6.63.84c-.3-.36-.42.2-.37.43.6 2.77 5.72 2.9 6.28 2.95.6.05 1.48.97 1.17 1.38-.3.38-5.15.32-7.14-.5-.1-.05-.43-.06-.13.33 1.24 1.7 7.7 1.77 7.66 2-.04.25-4.3 4.37-2.03 6.7.14.13.57.3.65-.15 1.12-3.65 3.15-5.97 4.03-6.07.8-.1 5.27.25 5.34.25h.13c.93-.08 4.42-.32 5.22-.23.87.1 2.9 2.43 4.02 6.1.06.45.5.3.64.14 2.27-2.3-1.98-6.44-2.03-6.68-.04-.24 6.43-.3 7.67-2 .3-.4-.03-.4-.16-.33-2 .8-6.85.87-7.14.5-.3-.42.58-1.34 1.17-1.4z']
            }
        },
        5: {
            id: 5,
            svg: {
                paths: ['M23.5 15.5c1.13-1.38 2.7-11-5.12-14.26C10.58-2 6.82 2.87 6.88 4.87c-2.63.93-3.2 3.87-3.2 3.87S-.1 10.62 0 12.87s2.88 2.37 2.88 2.37l.83 1.15.2-1.2S8 13.3 8.2 15c.17 1.65-3.6 2.23-3.6 2.23l-.8-.56.24 1.05s-.84.26-.46 1.07c.75 1.2 3.25-.5 3.25-.5S4.9 25.6 10.45 24c-3.44-1.75-.3-4.44-.3-4.44s.68 7 7.5 2.75c-5.4.6-4.16-2.1-3.57-2.7l3.56-3.7s1.56 2.35-2.25 5.2c5 1.34 5.2-7.8 5.2-7.8s1.2 4.4-1.98 7.33c7.1-1.56 3.54-10.5 3.54-10.5s1.32.44 1.25 5.38zm-18.8-7c-.13-.46.2-.82.57-.88s1.67.32 2.05.52c.38.2-2.5.8-2.63.35z']
            }
        },
        6: {
            id: 6,
            svg: {
                paths: [
                    'M26.6 9.34C25.5 5.4 23.96-.14 15.8 0c-1.54.5 4.4 1.07 3.9 3C17 1.45 15.4.4 13.46.57c-1.92.18-2.75 1.88-2.68 3.1 1.56.83 3.56 7.27 4.2 8.63.65 1.36 1.78 3.44 2.93 4.07C19.1 17 16.3 21 14 21.1c-2.34.1-8.23 2.65-8.94 5.98 1.43-1.68 7.08-4.64 9.52-4.55 2.43.1 4.76-2.7 5.15-3.5.1 3.6-3.46 5-5.97 5.06-3.62 0-9.06 3.5-8.4 5.6.66-1.8 5.2-4 8.2-4.1 3.02-.2 5.8-1.7 7.25-3-.7 2.8-3.3 3.8-6.3 4.34s-9 2.2-8.9 4.96c1.2-1.72 6.56-3.35 12.3-3.73 5.8-.38 10.6-12.06 8.8-18.94zm-6.75-7.68s4.74 2.64 2.4 6.9c.5-4.17-2.4-6.9-2.4-6.9zm3.3 2.96s5.17 7.1-.9 10.6c3.75-4.75.9-10.6.9-10.6z',
                    'M8.33 13.85c.05.4-.23.96-.3 1.25-.06.3-.47.2-.4.6.04.43.55.6.55.6s-.4.22-.37.54c.1.54 1.1.08 1.2.3.1.2.1.04 0 .47s-.8.6-.4 1.7c.6 1.5 7.2.6 8.8-2.3-5.63-5-5.75-12.5-6.9-12.3-1.1.17-2.1 4.85-2.12 5.9-.02 1.1-1.16 1.8-1.3 2.6-.14.88 1.05.5 1.33.76zm.32-3.87c.07-.2 1.66.3 1.66.53 0 .3-1.1.3-1.4.3-.1 0-.4-.1-.2-.72z'
                ]
            }
        },
        7: {
            id: 7,
            svg: {
                paths: ['M32 23.07L27.23 11.4h2.13V9.77s-4.86-.26-8.3-1.53c-2.8-1.04-4.17-3.14-5.03-3.18-.97-.05-2.8 2-6.03 3.18C6.77 9.4 2.13 9.76 2.13 9.76v1.65H4.6L0 22.7s-.5 3.92 5.05 3.92c5.56 0 5.7-3.9 5.7-3.9L6.13 11.4h7.2c.62.64 1.48 1.05 2.44 1.05s1.82-.4 2.43-1.06H26l-4.74 11.66s-.2 3.88 5.35 3.88c5.58 0 5.4-3.88 5.4-3.88zM.9 22.7l4.18-10.47V22.7H.88zm4.75 0V12.24l4.2 10.48h-4.2zm10.12-12.54c-.56 0-1-.45-1-1 0-.57.44-1.03 1-1.03s1.02.45 1.02 1.02c-.03.56-.48 1-1.04 1zm11.13 2.42l4.2 10.5h-4.2v-10.5zm-4.76 10.5l4.2-10.5v10.5h-4.2z']
            }
        },
        8: {
            id: 8,
            svg: {
                paths: ['M26.22 19.17c-.6.35-1.87.2-2.54.08-.68-2.23-3.1-4.38-6.35-5.37-2.8-.85-5.57-.64-7.44.38-.8-.73-2.3-1.65-4.6-.65.9-.5 2.3-2.8-.8-3.9C6.1 9.1 7 7 5.9 5.2c.83-.1 1.2-1.28 1.2-1.28S9.26 6.9 12.04 5C9.4 4.5 9.16 3.87 9.16 3.87s3.66-1.3 10.6-.86c-5.62-6.6-13 0-13 0s-2.2-1-2.1 1.6c-.56-.1-3.8 1.8-1.8 5.2-1.9.5-1.4 4.9.4 4.8-.3 2.6 3.1 3.7 4.34 3.9.1.7.35 1.3.72 1.9l-.28.1c-1.9.4-4.2 2.1-4.76 4.8-.04.2.1.4.3.5.22.08.43-.05.47-.3.5-2.34 2.5-3.8 4.15-4.2.22 0 .42-.03.62-.03.38.5.84.96 1.37 1.4-1.4.26-3.3 1.15-4.5 4.7-.1.2 0 .4.2.5H6c.15 0 .3-.1.36-.3 1.24-3.9 3.44-4.2 4.6-4.24.9.6 1.9 1.08 3 1.4.44.15.87.25 1.3.3-.86 1.35-1.1 3.6-.5 5.5.06.2.27.35.5.3.2-.1.3-.3.24-.5-.54-1.8-.3-4.06.6-5.1l.06-.04c.67.1 1.3.1 1.9.1l.2.4c.87 1.8.7 5.15.15 6.02-.1.2 0 .4.1.54l.2.06c.2 0 .3-.08.4-.2.7-1.1.8-4.84-.1-6.77l-.1-.17.5-.06c.7.92 2.2 2.7 3.6 2.62 1.57 2.8 4 1.9 4.2 1.3-1-.56-1.56-1.7-1.56-1.7s.95-1.5 2.37-1.24c-.2-1.2-2.66-2.18-4.6.8-.92.4-2.3-1-3.13-2.03 1.7-.52 2.9-1.55 3.38-2.97.2-.53.2-1.05.17-1.6l2.2.06c-.34 3.5 2.2 4.3 3.08 3.45-1.2-.7-1-2.4-1-2.4s1.15-.6 2.3-.4c.2-.6-1.15-2.8-4.1-1.6z']
            }
        },
        9: {
            id: 9,
            svg: {
                paths: ['M30 15.67l-4.3-1.4v1.07h-4.93c.3-1.67 1.86-1.55 1.73-5.04-.14-3.85-6.55-3.98-6.32-10.3l-.1.14.03-.14L4.58 14.44 2 14.17l1.27 1.74-1.24 1.74 2.77-.38L16.18 32l.05-1.18c.55-5.17 6.14-5.53 6.27-9.12.14-3.85-1.78-3.3-1.78-5.6V16h5v1.53l4.3-1.86zM15 2.97c-.1 3.43 5.07 4.8 5.07 7.33 0 2.8-1.08 3-1.33 5.04H7.72l-.92-.66-1.26-.13L15 2.95zm3.7 13.1c.08 2.63 1.38 2.58 1.38 5.63 0 2.57-5.32 3.93-5.08 7.47L5.73 17.12l1.1-.15L8 16h10.68v.07z']
            }
        },
        10: {
            id: 10,
            svg: {
                paths: ['M31.05 6.6c-3.83-9.74-11.5 1.95-12.27 1.95h-5.56C12.45 8.55 4.8-3.15.96 6.6-2.88 16.38 6.1 17.2 6.1 17.2s-4.47-4.45-2.47-7.23c2-2.78 6.7 2.15 6.7 2.15S8 16.22 8.78 17.68s2.62 1.2 3 2.4c.35 1.22.5 6.44.5 6.44.17.4 1.2 2.44 3.63 2.75h.2c2.44-.3 3.47-2.34 3.63-2.75 0 0 .16-5.22.52-6.43.37-1.2 2.2-.96 3-2.43s-1.58-5.56-1.58-5.56 4.72-4.92 6.7-2.14c2 2.78-2.45 7.24-2.45 7.24s8.98-.83 5.15-10.6z']
            }
        },
        11: {
            id: 11,
            svg: {
                paths: ['M30.4 19.65s-2.18-4.98-3.93-7.9c.13-1.55.23-4.76-1.1-6.1-.5-.5-1.15-.7-1.9-.6-1.22.15-2.13.63-2.7 1.42-.35.5-.5 1.03-.54 1.47-1.55-.34-2.77-.44-2.77-.44s-.08-3.42-.54-3.63c-.24-.1-2 1.56-3.54 3.25-.43.47-.85.94-1.2 1.38-.44.4-1 .84-1.76 1.32-4.95 4.88-5.78 11.3-6.37 12.96C3.45 24.44 0 26.5 0 26.5l3.5.03s3.13-6.34 3.83-9.36c.55 1.48-3.2 9.34-3.2 9.34s2.04.08 2.24 0c.2-.05 2.7-8.63 2.64-11.2.7 2.36-1.43 11.25-1.43 11.25h3.73c-1.92-1.5-1.04-4.13-1.25-8.5-.14-2.9.87-5.74 1.57-7.35 1.13.15 3.4-.3 3.4-.3s-.15 1.2.04 2.72c-.46-.03-1.34 0-2.14.58-.78.56-1.26 1.47-1.43 2.7-.1.74.1 1.4.6 1.88.95.96 2.86 1.18 4.44 1.18 1.07 0 1.98-.1 2.34-.14 3.33 1.98 8.6 3.62 8.6 3.62l2.9-3.3zm-17.6-2.08c-.28-.27-.38-.6-.32-1.04.13-.94.47-1.62 1.02-2 .75-.56 1.68-.4 1.7-.4v-.1c.3 1.47.96 3.1 2.3 4.3.05.03.1.06.13.1-1.63.1-3.95 0-4.83-.86zm12.08-7.75c-1.02-.76-2.4-1.28-3.68-1.63.03-.35.12-.78.4-1.16.4-.55 1.07-.9 2.02-1.02.43-.06.76.04 1.03.3.75.76.9 2.58.88 4.1-.2-.23-.43-.45-.65-.6z']
            }
        },
        12: {
            id: 12,
            svg: {
                paths: [
                    'M15.15 14.7s.16.33.3.36c1.05.25 5.74 1.32 7.1.47.7-.47-1.93-2.73-1.93-2.73s3.12 1.44 3.65.9c1.92-3.1-3.04-8.2-4.3-9.4-.32-.36-.56-.1-.56-.1l-5.8 4.1 1.64 6.4zm5.45-5.78c.5 0 .93.42.93.93 0 .52-.42.94-.93.94-.52 0-.94-.5-.94-1s.42-.96.94-.96z',
                    'M13.64 14.44c.64.04.46-.68.46-.68l-1.5-5.9 6.32-4.12s.42-.28.02-.53C17.94 2.4 15 0 14 0c-1.2.1-.9 3.26-1.77 3.07-9 .43-12.2 15.98-11.8 16.5.43.5.77.86 1.54.28.8 1.7-1.03 5.58-1.64 7.16-.16.5.25.4.52.2 1.4-1.4 2.38-1.9 2.94-1.82.5.07 1.8.55 2.5.97.36.26.77.2.4-.35-5.8-12.26 4.14-11.76 6.9-11.48z',
                    'M16.85 17.28s-.16-.3-.3-.35c-1.05-.24-5.74-1.3-7.1-.47-.7.48 1.93 2.73 1.93 2.73s-3.12-1.5-3.65-1c-1.93 3.1 3.04 8.2 4.3 9.42.33.34.56.1.56.1l5.9-4.1-1.7-6.43zm-5.45 5.8c-.5 0-.93-.42-.93-.94s.42-.93.93-.93c.52 0 .94.5.94 1s-.42.96-.94.96z',
                    'M31.15 4.87c-1.4 1.4-2.38 1.88-2.94 1.83-.5-.06-1.8-.55-2.5-.96-.36-.27-.77-.2-.4.35 5.83 12.2-4.12 11.7-6.86 11.4-.65-.06-.46.7-.46.7l1.5 5.9-6.3 4.1s-.43.3-.03.52c1 .84 3.94 3.28 4.93 3.2 1.2-.1.9-3.26 1.77-3.07 9-.44 12.2-16 11.8-16.5-.46-.5-.8-.87-1.58-.3-.78-1.7 1.04-5.57 1.65-7.16.16-.48-.25-.35-.52-.1z'
                ]
            }
        }
    };

    const list = Object.keys(map).map(id => map[parseInt(id)]);

    return {
        map() { return map },
        list() { return list },
        one(id: ZodiacSign) {
            return map[id];
        }
    }
}

export const ZodiacSignImages = createZodiacSignImages();

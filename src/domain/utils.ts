
export function convertDateToNumber(date: Date, format: 'D' | 'M' = 'D') {
    let number = '' + date.getFullYear();
    const month = date.getMonth() + 1;
    number += month < 10 ? '0' + month : month;
    if (format === 'M') {
        return parseInt(number);
    }
    const day = date.getDate();
    number += day < 10 ? '0' + day : day;

    return parseInt(number);
}

/** Utility function to create a K:V from a list of strings */
export function createEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}

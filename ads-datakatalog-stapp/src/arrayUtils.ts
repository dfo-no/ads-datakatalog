export const intersection = <T>(arr1: T[], arr2: T[]) => arr1.filter((elem) => arr2.includes(elem));

export const doesIntersect = <T>(arr1: T[], arr2: T[]) => intersection(arr1, arr2).length !== 0;

export const makeSureArray = (item: string | string[] | null) => (Array.isArray(item) ? item : [item as string]);

export const removeItem = <T>(arr: Array<T>, value: T): Array<T> => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

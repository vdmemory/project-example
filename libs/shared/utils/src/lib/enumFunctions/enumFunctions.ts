export function getKeyByEnumValue<T extends Record<string, string | number>>(
    enumObject: T,
    value: T[keyof T],
): keyof T {
    return Object.keys(enumObject).find(
        key => enumObject[key] === value,
    ) as keyof T;
}

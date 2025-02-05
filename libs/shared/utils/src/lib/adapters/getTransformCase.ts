export const getCamelCase = (str: string) => {
    return str.replace(/([-_][a-z])/gi, $1 => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

export const getSnakeCase = (str: string) => {
    return str.replace(/([A-Z])/g, $1 => {
        return `_${$1.toLowerCase()}`;
    });
};

export const getCamelCaseObject = (obj: { [x: string]: string }) => {
    const newObj: { [x: string]: string } = {};
    for (const key in obj) {
        newObj[getCamelCase(key)] = obj[key];
    }
    return newObj;
};

export const getSnakeCaseObject = (obj: { [x: string]: string }) => {
    const newObj: { [x: string]: string } = {};
    for (const key in obj) {
        newObj[getSnakeCase(key)] = obj[key];
    }
    return newObj;
};

export const getEmailPattern = (): RegExp =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getPasswordPattern = (): RegExp =>
    /(?=.*[a-zA-Z\d])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,}/;

export const getUrlPattern = (): RegExp =>
    /^((https|http|ftp):\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,}){1,}(\/?[\w.@_#()%=?&-]?)+$/i;

export const containsUrlPattern =
    /((https|http|ftp):\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,}){1,}(\/?[\w.@_#()%=?&-]?)+/gi;

export const urlPattern = getUrlPattern();
export const emailPattern = getEmailPattern();

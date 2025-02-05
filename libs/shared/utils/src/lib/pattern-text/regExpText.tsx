// select the values in curly brackets {$1}
export const matchTextByCurlyBrackets = /\{(.*?)\}|([\w\s’!&,.-]+)/gim;
export const splitTextByCurlyBrackets = /\{(.*?)\}/gim;
export const findBrackets = /[{}]/g;
export const findDollar = /[$]+/g;
export const normalizingString = /[{$}]+/gm;
export const findFirstAt = /(^@)/gm;
export const findProfileNameInSocial = /com\/(?:@|)([\w.]+)(?:\/|)/gim;
export const findDefaultSocialLinkDomain =
    /(twitter|tiktok|instagram|linkedin)\.com/gim;
export const checkProfileNameInSocial = /^([\w.]+)(?:\/|)$/gim;
export const checkSocialUsername = /^@[A-Za-z0-9_.]+$/;
export const findSlash = /\//g;
export const findQuestionMark = /\?.*/g;
export const findSpace = /\s/g;
export const findSpecialCharacters = /[`~!@#$%^&*()|+=?;:'",<>{}[\]\\/]/gi;
export const findDomainName = /^(?:https?:\/\/)?([^:\\/\n]+)/gm;
export const findProtocolName = /^(?:https?:\/\/)/gm;

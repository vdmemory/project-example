import { findDomainName, findProtocolName } from '../pattern-text/regExpText';

export function getDomainName(url: string) {
    const domain = url.match(findDomainName);
    if (!domain) return '';
    return domain[0].replace(findProtocolName, '');
}

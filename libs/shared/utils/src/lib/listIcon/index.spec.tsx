import { getBankIcon, getCardIcon } from './getIconPayment';
import {
    AmericanExpressIcon,
    BankOfAmericaIcon,
    BettermentBankIcon,
    CapitalOneBankIcon,
    ChaseBankIcon,
    CitibankOnlineBankIcon,
    CitizensBankIcon,
    DefaultBankIcon,
    defaultCreditCard,
    DinersClubIcon,
    DiscoverIcon,
    FidelityBankIcon,
    HuntingtonBankIcon,
    JcbIcon,
    MastercardIcon,
    NavyFederalCreditUnionBankIcon,
    RegionsBankIcon,
    StashBankIcon,
    UnionPayIcon,
    UsaaBankIcon,
    VisaIcon,
    WealthFrontBankIcon,
    WellsFargoBankIcon,
} from '@breef/shared/assets';

const getDefaultCardImage = (name: string) => (
    <img alt={`icon ${name}`} src={defaultCreditCard.src} />
);

describe('getCardIcon', () => {
    it('should return the correct icon URL for Mastercard', () => {
        const result = getCardIcon('mastercard');
        expect(result).toEqual(<MastercardIcon />);
    });
    it('should return the correct icon URL for Visa', () => {
        const result = getCardIcon('visa');
        expect(result).toEqual(<VisaIcon />);
    });
    it('should return the default icon URL for an unknown card type', () => {
        const result = getCardIcon('unknown');
        expect(result).toEqual(getDefaultCardImage('unknown'));
    });
    it('should return the correct icon URL for UnionPay', () => {
        const result = getCardIcon('unionpay');
        expect(result).toEqual(<UnionPayIcon />);
    });
    it('should return the correct icon URL for JCB', () => {
        const result = getCardIcon('jcb');
        expect(result).toEqual(<JcbIcon />);
    });
    it('should return the correct icon URL for American Express', () => {
        const result = getCardIcon('amex');
        expect(result).toEqual(<AmericanExpressIcon />);
    });
    it('should return the correct icon URL for Diners Club', () => {
        const result = getCardIcon('diners');
        expect(result).toEqual(<DinersClubIcon />);
    });
    it('should return the correct icon URL for Discover', () => {
        const result = getCardIcon('discover');
        expect(result).toEqual(<DiscoverIcon />);
    });
    it('should return the default icon URL for an invalid card type', () => {
        const result = getCardIcon('invalid');
        expect(result).toEqual(getDefaultCardImage('invalid'));
    });
});

describe('getBankIcon', () => {
    it('should return the correct icon for "Chase"', () => {
        expect(getBankIcon('Chase')).toEqual(<ChaseBankIcon />);
    });
    it('should return the correct icon for "Chase Bank"', () => {
        expect(getBankIcon('Chase Bank')).toEqual(<ChaseBankIcon />);
    });
    it('should return the correct icon for "Bank of America"', () => {
        expect(getBankIcon('Bank of America')).toEqual(<BankOfAmericaIcon />);
    });
    it('should return the correct icon for "Wells Fargo"', () => {
        expect(getBankIcon('Wells Fargo')).toEqual(<WellsFargoBankIcon />);
    });
    it('should return the correct icon for "Citibank Online"', () => {
        expect(getBankIcon('Citibank Online')).toEqual(
            <CitibankOnlineBankIcon />,
        );
    });
    it('should return the correct icon for "Capital One"', () => {
        expect(getBankIcon('Capital One')).toEqual(<CapitalOneBankIcon />);
    });
    it('should return the correct icon for "USAA"', () => {
        expect(getBankIcon('USAA')).toEqual(<UsaaBankIcon />);
    });
    it('should return the correct icon for "Citizens Bank"', () => {
        expect(getBankIcon('Citizens Bank')).toEqual(<CitizensBankIcon />);
    });
    it('should return the correct icon for "Huntington Bank"', () => {
        expect(getBankIcon('Huntington Bank')).toEqual(<HuntingtonBankIcon />);
    });
    it('should return the correct icon for "Wealthfront"', () => {
        expect(getBankIcon('Wealthfront')).toEqual(<WealthFrontBankIcon />);
    });
    it('should return the correct icon for "Betterment"', () => {
        expect(getBankIcon('Betterment')).toEqual(<BettermentBankIcon />);
    });
    it('should return the correct icon for "Stash"', () => {
        expect(getBankIcon('Stash')).toEqual(<StashBankIcon />);
    });
    it('should return the correct icon for "TD Bank"', () => {
        expect(getBankIcon('TD Bank')).toEqual(<DefaultBankIcon />);
    });
    it('should return the correct icon for "Regions Bank"', () => {
        expect(getBankIcon('Regions Bank')).toEqual(<RegionsBankIcon />);
    });
    it('should return the correct icon for "Navy Federal Credit Union"', () => {
        expect(getBankIcon('Navy Federal Credit Union')).toEqual(
            <NavyFederalCreditUnionBankIcon />,
        );
    });
    it('should return the correct icon for "Charles Schwab"', () => {
        expect(getBankIcon('Charles Schwab')).toEqual(<DefaultBankIcon />);
    });
    it('should return the correct icon for "Fidelity"', () => {
        expect(getBankIcon('Fidelity')).toEqual(<FidelityBankIcon />);
    });
    it('should return the default icon for unknown bank names', () => {
        expect(getBankIcon('Unknown Bank')).toEqual(<DefaultBankIcon />);
    });
});

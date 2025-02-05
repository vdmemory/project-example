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

export const getCardIcon = (cardType: string) => {
    switch (cardType) {
        case 'mastercard':
            return <MastercardIcon />;
        case 'visa':
            return <VisaIcon />;
        case 'unionpay':
            return <UnionPayIcon />;
        case 'jcb':
            return <JcbIcon />;
        case 'amex':
            return <AmericanExpressIcon />;
        case 'diners':
            return <DinersClubIcon />;
        case 'discover':
            return <DiscoverIcon />;
        default:
            return <img src={defaultCreditCard.src} alt={`icon ${cardType}`} />;
    }
};

export const getBankIcon = (bankName: string) => {
    switch (bankName) {
        case 'Chase':
        case 'Chase Bank':
            return <ChaseBankIcon />;
        case 'Bank of America':
            return <BankOfAmericaIcon />;
        case 'Wells Fargo':
            return <WellsFargoBankIcon />;
        case 'Citibank Online':
            return <CitibankOnlineBankIcon />;
        case 'Capital One':
            return <CapitalOneBankIcon />;
        case 'USAA':
            return <UsaaBankIcon />;
        case 'Citizens Bank':
            return <CitizensBankIcon />;
        case 'Huntington Bank':
            return <HuntingtonBankIcon />;
        case 'Wealthfront':
            return <WealthFrontBankIcon />;
        case 'Betterment':
            return <BettermentBankIcon />;
        case 'Stash':
            return <StashBankIcon />;
        case 'Regions Bank':
            return <RegionsBankIcon />;
        case 'Navy Federal Credit Union':
            return <NavyFederalCreditUnionBankIcon />;
        case 'Fidelity':
            return <FidelityBankIcon />;
        case 'TD Bank':
        case 'Charles Schwab':
            return <DefaultBankIcon />;

        default:
            return <DefaultBankIcon />;
    }
};

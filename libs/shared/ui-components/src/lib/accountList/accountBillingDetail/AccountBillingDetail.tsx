import { ArrowRightIcon } from '@breef/ui-kit';
import { StyledAccountBillingDetail } from './AccountBillingDetail.styled';
import { ShortBillingAddress } from '@breef/shared/types';

interface AccountItemProps {
    onClick?: () => void;
    billingDetail: ShortBillingAddress;
}
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

const getRegionName = (countryCode?: string | null) => {
    if (!countryCode) return '';

    try {
        return ', ' + regionNames.of(countryCode);
    } catch (e) {
        console.log(
            `regionNames.of(countryCode): ${countryCode};`,
            `error: '${e}'`,
        );
        return ', ' + countryCode;
    }
};

export const AccountBillingDetail = ({
    onClick,
    billingDetail: { line1, city, country },
}: AccountItemProps) => {
    return (
        <StyledAccountBillingDetail
            className="billing-detail-wrapper"
            onClick={onClick}
            data-testid="billing-detail-wrapper"
        >
            <div className="item-group">
                <span className="item-label">Billing</span>
                <span className="item-street">{line1}</span>
                <span className="item-location">
                    {city && city}
                    {getRegionName(country)}
                </span>
            </div>
            <ArrowRightIcon />
        </StyledAccountBillingDetail>
    );
};

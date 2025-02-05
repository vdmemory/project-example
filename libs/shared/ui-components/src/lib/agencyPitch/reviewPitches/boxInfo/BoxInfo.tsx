import { AvatarImage } from '@breef/ui-kit';
import { StyledBoxInfo } from './BoxInfo.styled';
import { BrandLeadShort } from '@breef/shared/types';

interface BoxInfoProps {
    label?: string;
    logo?: string;
    name?: string;
    adminNote: string;
    brandLead: BrandLeadShort;
    className?: string;
    hideAgency?: boolean;
}

export const BoxInfo = ({
    label,
    logo,
    name,
    adminNote,
    brandLead: { name: brandLeadName, logo: brandLeadLogo },
    className,
    hideAgency,
}: BoxInfoProps) => {
    const classes = className ? `box-info ${className}` : 'box-info';

    const renderAgencyInfo = () => (
        <div className="agency">
            <AvatarImage
                src={logo}
                width={30}
                height={30}
                alt="Agency Logo"
                className="agency-logo"
            />
            {name && <div className="agency-name">{name}</div>}
        </div>
    );

    return (
        <StyledBoxInfo className={classes}>
            {label ? <label className="box-label">{label}</label> : null}
            {!hideAgency && renderAgencyInfo()}
            {adminNote ? <div className="note">“{adminNote}”</div> : null}
            <div className="brand-lead">
                <AvatarImage
                    src={brandLeadLogo}
                    width={80}
                    height={80}
                    alt="Brand Lead Avatar"
                    className="brand-lead-avatar"
                />
                {brandLeadName && (
                    <div className="group">
                        <div className="brand-lead-name">{brandLeadName}</div>
                        <div className="brand-lead-label">Your Strategist</div>
                    </div>
                )}
            </div>
        </StyledBoxInfo>
    );
};

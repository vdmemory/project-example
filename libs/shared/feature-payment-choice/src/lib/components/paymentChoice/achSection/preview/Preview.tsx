// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StripeLogoIcon } from '@breef/ui-kit';
import { StyledPreview } from './Preview.styled';
import {
    BankOfAmericaIcon,
    ChaseBankIcon,
    CitibankOnlineBankIcon,
    FidelityBankIcon,
} from '@breef/shared/assets';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export interface PlaidPreviewProps {
    label: string;
    children?: React.ReactNode;
}

const listBanks = [
    {
        name: 'Bank of America',
        logo: <BankOfAmericaIcon />,
    },
    {
        name: 'Chase',
        logo: <ChaseBankIcon />,
    },
    {
        name: 'Citibank Online',
        logo: <CitibankOnlineBankIcon />,
    },
    {
        name: 'Fidelity',
        logo: <FidelityBankIcon />,
    },
];

export const Preview = ({ label, children }: PlaidPreviewProps) => {
    const renderLogos = ({
        logo,
        name,
    }: {
        logo: EmotionJSX.Element;
        name: string;
    }) => (
        <div className="border" key={name}>
            {logo}
        </div>
    );
    return (
        <StyledPreview>
            <div className="stub-preview">
                <div className="group">
                    <div className="logo">
                        <StripeLogoIcon />
                    </div>
                    <div className="line"></div>
                    <div className="logos">{listBanks.map(renderLogos)}</div>
                </div>
                <div className="text">{label}</div>
            </div>
            {children}
        </StyledPreview>
    );
};

export default Preview;

import { StyledSideBar } from './SideBar.styled';
import { aditiLogo } from '@breef/shared/assets';
import { AnimatePresence } from 'framer-motion';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { useProjectCreateSelector } from '../../../store/hooks';

interface SideBarProps {
    className?: string;
    step: number;
}
const SideBar = ({ className, step }: SideBarProps) => {
    const {
        profile: { brandLead },
    } = useProjectCreateSelector(state => state).projectCreate;

    const leadLogo = brandLead?.brandLead.logoUrl;
    const leadName = `${brandLead?.firstName} ${brandLead?.lastName?.charAt(
        0,
    )}.`;

    const renderTip = ({ title, description }: TipsConfigItem) => (
        <AnimationOpacity key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
        </AnimationOpacity>
    );

    return (
        <StyledSideBar data-testid="side-bar" className={className}>
            <div className="card-tip">
                <AnimatePresence exitBeforeEnter>
                    {renderTip(tipsConfig[step - 1])}
                </AnimatePresence>
                <div className="lead-info-wrapper">
                    {leadLogo && <img src={leadLogo} alt="Lead Logo" />}
                    <div className="lead-info">
                        <span className="lead-name">{leadName}</span>
                        <span className="lead-position">Your Strategist</span>
                    </div>
                </div>
            </div>
        </StyledSideBar>
    );
};

export default SideBar;

type TipsConfigItem = { title: string; description: string };
const tipsConfig: TipsConfigItem[] = [
    {
        title: 'Let’s create your project',
        description:
            'To start, tell us more about what type of agency support you’re looking for. We’ll build a project scope based on your goals, budget and preferences.',
    },
    {
        title: 'Your ideal agency',
        description:
            'Share more about your ideal agency. What’s important to you? We consider various factors to ensure that your agency pitches are the perfect fit.',
    },
    {
        title: 'Your project scope',
        description:
            'We’ve put together a project scope based on your requirements and preferences. Now, personalize your scope and add specifics. The more details, the better.',
    },
    {
        title: 'Last step: your company',
        description:
            'Let’s add the finishing touches to your project scope: more about you! Share your company bio and website.',
    },
];

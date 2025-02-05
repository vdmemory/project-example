import { useController, useFormContext } from 'react-hook-form';
import { PitchCreateOurAgencyFormType } from '../../../types/pitchCreateType';
import {
    StyledFieldInfo,
    StyledOurAgencyStep,
    StyledView,
} from './OurAgencyStep.styled';
import { Input, Label, Textarea } from '@breef/ui-kit';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LogoUploader } from '@breef/shared/ui-components';
import {
    InstagramSmallIcon,
    PortfolioIcon,
    WebsiteSmallIcon,
} from '@breef/shared/assets';
import {
    usePitchCreateActions,
    usePitchCreateSelector,
    usePitchPreviewSelector,
} from '../../../store/hooks';
import { useMediaContext } from '@breef/shared/hooks';
import { useEffect } from 'react';
import { getWarningLinkMessage } from '@breef/shared/utils';

export const OurAgencyStep = () => {
    const { isMaxMobile } = useMediaContext();

    const {
        shortProjectInfo: { clientName },
    } = usePitchPreviewSelector(state => state.pitchPreview);

    const { companyInfo } = usePitchCreateSelector(state => state).pitchCreate;

    const { setIsDisabledSubmit } = usePitchCreateActions();
    const { control, trigger } = useFormContext<PitchCreateOurAgencyFormType>();

    const { field: fieldAboutUs, fieldState: fieldAboutUsState } =
        useController({ control, name: 'aboutUs' });
    const { field: fieldLogo } = useController({ control, name: 'logo' });
    const { field: fieldTagline, fieldState: fieldTaglineState } =
        useController({ control, name: 'tagline' });
    const { field: fieldWebsite, fieldState: fieldWebsiteState } =
        useController({ control, name: 'website' });
    const { field: fieldPortfolio, fieldState: fieldPortfolioState } =
        useController({ control, name: 'portfolio' });
    const { field: fieldInstagram, fieldState: fieldInstagramState } =
        useController({ control, name: 'instagram' });

    useEffect(() => {
        if (fieldAboutUs.value) {
            trigger('aboutUs');
        }
        if (fieldTagline.value) {
            trigger('tagline');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const agency = companyInfo?.companyName ?? '';

    return (
        <StyledOurAgencyStep>
            <Label
                text="About Us"
                subtext="Tell the client about your agency, mission, and team. Any changes will be saved to your profile."
                forId="about-us"
                id="about-us-label"
            >
                <div className="about-us-wrapper">
                    <LogoUploader
                        onChange={fieldLogo.onChange}
                        logoUrl={fieldLogo.value?.url}
                        setIsLoading={setIsDisabledSubmit}
                        isVisibleLoader
                    />
                    <Textarea
                        {...fieldAboutUs}
                        error={fieldAboutUsState.error?.message}
                        warning={getWarningLinkMessage(
                            fieldAboutUs.value,
                            warningLinkMessage,
                        )}
                        maxLength={1000}
                        isErrorRightPlacement
                        placeholder="We are a digital marketing agency at the intersection of strategy, technology, and content marketing..."
                    />
                </div>
            </Label>
            <Label
                text="Tagline"
                subtext="In one sentence, how would you describe your agency?"
                forId="tagline"
                id="tagline-label"
            >
                <Input
                    {...fieldTagline}
                    placeholder="The modern media agency..."
                    error={fieldTaglineState.error?.message}
                    warning={getWarningLinkMessage(
                        fieldTagline.value,
                        warningLinkMessage,
                    )}
                    maxLength={80}
                    isVisibleCounter
                />
            </Label>
            <Label
                text="Agency Links"
                forId="agency-links"
                id="agency-links-label"
                className="agency-links-wrapper"
            >
                <div className="links-fields-row">
                    <StyledFieldInfo>
                        <div className="field-info-content">
                            <WebsiteSmallIcon />
                            <span>Website</span>
                        </div>
                        <Input
                            {...fieldWebsite}
                            placeholder="https://abcompany.com"
                            error={fieldWebsiteState.error?.message}
                            maxLength={1000}
                        />
                    </StyledFieldInfo>
                    <StyledFieldInfo>
                        <div className="field-info-content">
                            <PortfolioIcon />
                            <span>Portfolio</span>
                        </div>
                        <Input
                            {...fieldPortfolio}
                            placeholder="https://myportfolio.com"
                            error={fieldPortfolioState.error?.message}
                            maxLength={1000}
                        />
                    </StyledFieldInfo>
                </div>
                <StyledFieldInfo>
                    <div className="field-info-content">
                        <InstagramSmallIcon className="instagram-icon" />
                        <span>Instagram</span>
                    </div>
                    <Input
                        {...fieldInstagram}
                        placeholder="@abcopmany"
                        error={fieldInstagramState.error?.message}
                        maxLength={1000}
                    />
                </StyledFieldInfo>
            </Label>
        </StyledOurAgencyStep>
    );
};

export default OurAgencyStep;

const warningLinkMessage =
    'Please include any links in Additional links section.';

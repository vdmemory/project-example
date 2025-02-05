import {
    getPopupStylePreset,
    popupGlobalStyles,
    StyledCompanyDetailsPopup,
} from './CompanyDetailsPopup.styled';
import { CloseIcon } from '@breef/shared/assets';
import { useMediaContext } from '@breef/shared/hooks';
import {
    Autocomplete,
    HyperlinkIcon,
    Input,
    Label,
    Textarea,
    Button,
    ArrowSmallIcon,
} from '@breef/ui-kit';
import { Global } from '@emotion/react';
import { Fragment, useEffect, useState } from 'react';
import { Popup } from '@breef/shared/ui-components';
import { useCompanyDetailsFormControl } from '../../../../hooks/useCompanyDetailsFormControl';
import { FormType } from '../../../../types/projectCreateTypes';

interface CompanyDetailsPopupProps {
    onClose?: () => void;
    onNext?: (form: FormType) => void;
    onBack?: () => void;
    formData?: FormType;
    resetForm?: () => void;
    isSubmitting?: boolean;
}

export const CompanyDetailsPopup = ({
    onClose,
    onNext,
    onBack,
    formData,
    isSubmitting,
}: CompanyDetailsPopupProps) => {
    const { isMobile } = useMediaContext();
    const {
        form: { name, website, location, description },
        handleSave,
        isValidForm,
        clearErrors,
        setError,
    } = useCompanyDetailsFormControl({
        formData,
        onSubmit: onNext,
    });

    const [queryLocation, setQueryLocation] = useState(
        location.field.value as string,
    );

    const [checkQuery, setCheckQuery] = useState(false);

    const onClickLocation = (id: number, name: string) => {
        location.field.onChange(name);
    };

    const updateQueryLocation = (value: string) => {
        setQueryLocation(value);
        if (!checkQuery) {
            setCheckQuery(true);
        }
    };

    useEffect(() => {
        if (!checkQuery) return;

        clearErrors('location');
        const message = 'Select a preferred agency location';

        if (queryLocation === '') {
            setError('location', { message });
        }
        if (queryLocation !== location.field.value) {
            setError('location', { message });
        }
    }, [checkQuery, queryLocation, location.field.value]);

    const isSubmitDisplay = !!onNext;
    const isBackDisplay = !!onBack;
    const isCloseButtonDisplay = !!onClose;

    const justifyButtons = isSubmitDisplay && isBackDisplay;

    const title = 'Add company details';
    const subtitle =
        'This is the last step before viewing your custom project scope.';

    return (
        <Fragment>
            <Popup
                key={'popup-book-a-call-modified'}
                style={getPopupStylePreset(isMobile)}
                isClosable={false}
            >
                <StyledCompanyDetailsPopup justifyButtons={justifyButtons}>
                    <Global styles={popupGlobalStyles} />
                    <div className="form-header">
                        <div className="group">
                            <h3 className="title">{title}</h3>
                            <p className="subtitle">{subtitle}</p>
                            <div className="divider"></div>
                        </div>
                        {isCloseButtonDisplay && (
                            <div className="close-wrapper">
                                <CloseIcon
                                    className="close-button"
                                    role="button"
                                    onClick={onClose}
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-body">
                        <Input
                            {...name.field}
                            error={name.error?.message}
                            placeholder="Company Name"
                            maxLength={255}
                        />
                        <Input
                            {...website.field}
                            error={website.error?.message}
                            placeholder="Website"
                            maxLength={950}
                            placeholderIcon={<HyperlinkIcon />}
                        />
                        <Autocomplete
                            {...location.field}
                            onClick={onClickLocation}
                            placeholder="Company Location"
                            error={location.error?.message || ''}
                            maxLength={255}
                            onChangeQueryOutside={updateQueryLocation}
                        />
                        <Label
                            text="Company Description"
                            subtext="Share more about your company."
                        >
                            <Textarea
                                {...description.field}
                                error={description.error?.message}
                                maxLength={2000}
                                placeholder="We’re a small, woman-owned, beauty company focusing on...."
                            />
                        </Label>
                    </div>
                    <div className="form-footer">
                        {isBackDisplay && (
                            <button
                                className="button-back"
                                onClick={onBack}
                                type="button"
                            >
                                <ArrowSmallIcon />
                            </button>
                        )}
                        {isSubmitDisplay && (
                            <Button
                                label="Next"
                                size="medium"
                                isDisabled={!isValidForm}
                                isSubmitted={isSubmitting}
                                onClick={handleSave}
                                className="button-save"
                                iconPlacement="right"
                            />
                        )}
                    </div>
                </StyledCompanyDetailsPopup>
            </Popup>
        </Fragment>
    );
};

import { FC, Fragment } from 'react';
import {
    Autocomplete,
    Label,
    Pill,
    RadioRectangle,
    Search,
    Textarea,
} from '@breef/ui-kit';
import { StyledFlexColumn, StyledFlexRow } from '../../ProjectCreate.styled';
import { PenNavNames } from '@breef/shared/constants';
import { PillsWrapper } from '../../pillsWrapper/PillsWrapper';
import { Control, UseFormClearErrors } from 'react-hook-form';
import { PreferencesFormType } from '../../../../types/projectCreateTypes';
import { useAgencyPreferencesStepControl } from './useAgencyPreferencesStepControl';

interface AgencyPreferencesStepFieldsProps {
    control: Control<PreferencesFormType>;
    clearErrors: UseFormClearErrors<PreferencesFormType>;
    isDisplayOptional?: boolean;
    isAgencyPreferencesEndField?: boolean;
}
export const AgencyPreferencesStepFields: FC<
    AgencyPreferencesStepFieldsProps
> = ({
    control,
    clearErrors,
    isDisplayOptional,
    isAgencyPreferencesEndField,
}) => {
    const {
        fields: {
            fieldAgencyLocation,
            fieldOpenToRemoteAgencies,
            fieldIdealAgency,
        },
        fieldStates: { fieldIdealAgencyState, fieldAgencyLocationState },
        agencyTagsControl: {
            searchTagsResult,
            handleSelectUniqueThing,
            fieldAgencyTags,
            isDisabledTags,
            setSearchTagName,
            isLoadingSearchTags,
            removeTag,
            addTag,
            suggestedTags,
        },
        onClickLocation,
        filterCriteriaSuggestedTags,
        handleChangeAnywhere,
    } = useAgencyPreferencesStepControl({ control, clearErrors });

    const renderAgencyPreferencesField = () => (
        <Label
            key={PenNavNames.AGENCY_PREFERENCES_FIELD}
            id={PenNavNames.AGENCY_PREFERENCES_FIELD}
            forId="agency-preferences"
            text="Agency Preferences"
            subtext="What matters to you in an agency? Select up to 10."
            isOptional={isDisplayOptional}
        >
            <Search
                list={searchTagsResult ?? []}
                onSelect={handleSelectUniqueThing}
                select={fieldAgencyTags.value}
                placeholder="Search"
                isRemovable={false}
                disabled={isDisabledTags}
                customHandleSearch={setSearchTagName}
                maxResults={5}
                searchDebounce={500}
                isSearching={isLoadingSearchTags}
            />
            {fieldAgencyTags.value.length !== 0 && (
                <PillsWrapper title="Selected" isSelectedWrapper>
                    {fieldAgencyTags.value.map((item, idx) => (
                        <Pill
                            key={item.name + item.id}
                            onClick={() => removeTag(item.id)}
                            label={item.name}
                            iconType="remove"
                            iconSide="left"
                            color="orange"
                            isResizeMobile={false}
                        />
                    ))}
                </PillsWrapper>
            )}
            <PillsWrapper title="Suggested">
                {suggestedTags
                    ?.filter(filterCriteriaSuggestedTags)
                    .slice(0, 12)
                    .map(item => (
                        <Pill
                            key={`${item.id} ${item.name}`}
                            label={item.name}
                            type="button"
                            iconSide="left"
                            iconType="add"
                            onClick={() => addTag(item)}
                            disabled={isDisabledTags}
                            isResizeMobile={false}
                            isTransparentInitially
                        />
                    ))}
            </PillsWrapper>
        </Label>
    );

    const renderIdealAgencyField = () => (
        <Label
            key={PenNavNames.IDEAL_AGENCY_FIELD}
            text="Your Ideal Agency"
            subtext="Share more about your ideal agency partner."
            isOptional={isDisplayOptional}
        >
            <Textarea
                {...fieldIdealAgency}
                placeholder="We’re looking for a team that specializes in..."
                error={fieldIdealAgencyState.error?.message}
                maxLength={2000}
            />
        </Label>
    );

    const lastTwoFields = [
        renderAgencyPreferencesField(),
        renderIdealAgencyField(),
    ];

    const renderLastTwoFields = () =>
        isAgencyPreferencesEndField ? lastTwoFields.reverse() : lastTwoFields;

    return (
        <Fragment>
            <Label
                forId="agency-location"
                text="Agency Location"
                subtext="Is the location of your agency important?"
            >
                <StyledFlexColumn>
                    <StyledFlexRow className="rectangle-wrapper">
                        <RadioRectangle
                            onChange={() => handleChangeAnywhere(true)}
                            checked={!!fieldOpenToRemoteAgencies.value}
                            label={'Anywhere'}
                        />
                        <RadioRectangle
                            onChange={() => handleChangeAnywhere(false)}
                            checked={!fieldOpenToRemoteAgencies.value}
                            label={'Specific location'}
                        />
                    </StyledFlexRow>
                    {!fieldOpenToRemoteAgencies.value && (
                        <Autocomplete
                            {...fieldAgencyLocation}
                            onClick={onClickLocation}
                            placeholder="Preferred Location"
                            error={
                                fieldAgencyLocationState.error?.message || ''
                            }
                            maxLength={255}
                        />
                    )}
                </StyledFlexColumn>
            </Label>
            {renderLastTwoFields()}
        </Fragment>
    );
};

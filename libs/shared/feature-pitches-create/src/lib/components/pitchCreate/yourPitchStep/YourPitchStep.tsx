import { FC, Fragment, useEffect, useState } from 'react';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { PitchCreateYourPitchFormType } from '../../../types/pitchCreateType';
import { Label, LinkUi, Pill, Range, Search, Textarea } from '@breef/ui-kit';
import { YourPitchStepStyled } from './YourPitchStep.styled';
import ApproachLink from './approachLink/ApproachLink';
import { usePitchPreviewSelector } from '../../../store/hooks';
import { getWarningLinkMessage } from '@breef/shared/utils';
import {
    BudgetRangeNormalised,
    BudgetType,
    listBudgetPitch,
} from '@breef/shared/constants';
import {
    useCreateTagMutation,
    useGetTagsQuery,
} from '@breef/shared/data-access-pitch-create';
import { toast } from 'react-toastify';
import { ListIdNameType } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';

export const YourPitchStep: FC = () => {
    const { control, trigger } = useFormContext<PitchCreateYourPitchFormType>();
    const {
        pitchPreview: { agencySkills, budgetType, budgetRange },
    } = usePitchPreviewSelector(state => state).pitchPreview;
    const [searchThingName, setSearchThingName] = useState('');
    const [searchThingsResult, setSearchThingsResult] = useState<
        ListIdNameType[]
    >([]);
    const { field: fieldPitchDetails, fieldState: fieldPitchDetailsState } =
        useController({ control, name: 'pitchDetails' });
    const { field: fieldApproach, fieldState: fieldApproachState } =
        useController({ control, name: 'approach.description' });
    const fieldApproachLinks = useFieldArray({
        control,
        name: 'approach.links',
    });
    const { field: fieldBudgetValue } = useController({
        control,
        name: 'budget.value',
    });
    const handleChangeBudgetValue = (value: string) => {
        fieldBudgetValue.onChange(value);
        if (value) {
            trigger('budget.comment');
        }
    };

    const { field: fieldBudgetComment, fieldState: fieldBudgetCommentState } =
        useController({
            control,
            name: 'budget.comment',
        });
    const { field: fieldUniqueThings } = useController({
        control,
        name: 'uniqueThings',
    });
    const isDisabledUniqueThings = fieldUniqueThings.value.length >= 10;

    const { data: suggestedThings } = useGetTagsQuery({
        suggested: true,
        limit: 26,
    });
    const { data: searchThings, isFetching: isLoadingSearchTags } =
        useGetTagsQuery({
            limit: 5,
            name: searchThingName,
            exclude: fieldUniqueThings.value.map(item => item.name),
        });

    const [createTag, { isLoading: isCreatingTag }] = useCreateTagMutation();
    const addUniqueThings = (value: { id: number; name: string }) => {
        fieldUniqueThings.onChange([...fieldUniqueThings.value, value]);
    };

    const removeUniqueThings = (id: number) => {
        fieldUniqueThings.onChange(
            fieldUniqueThings.value.filter(item => item.id !== id),
        );
    };

    const addNewTag = async (tag: string) => {
        try {
            const result = await createTag(tag).unwrap();
            addUniqueThings(result);
        } catch (e) {
            const message = 'Something went wrong when adding tag';
            toast.error(message, { toastId: message });
        }
    };

    const handleSelectUniqueThing = async ({
        id,
        name,
    }: {
        id?: number;
        name: string;
    }) => {
        if (!id) {
            try {
                const data = await createTag(name).unwrap();
                addUniqueThings(data);
            } catch (e) {
                toast.error('Something went wrong while adding new tag.');
            }
        } else if (fieldUniqueThings.value.map(item => item.id).includes(id)) {
            removeUniqueThings(id);
        } else {
            addUniqueThings({ id, name });
        }
    };

    const renderSkills = () =>
        agencySkills.map(item => (
            <Pill key={item.id} label={item.name} iconSide="none" isStatic />
        ));

    useEffect(() => {
        fieldApproachLinks.replace(
            fieldApproachLinks.fields.filter(item => item.title || item.link),
        );
        if (fieldApproach.value) {
            trigger('approach.description');
        }
        trigger('budget.comment');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!searchThingName) {
            setSearchThingsResult([]);
        } else {
            setSearchThingsResult(searchThings ?? []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchThings]);

    const selectedThingsCriteria = (item: { id: number; name: string }) =>
        !fieldUniqueThings.value
            .map(item => item.id)
            .some(id => id === item.id);

    const renderBudgetRangeRow = () => (
        <span className="budget-range-row">
            Amount: {BudgetRangeNormalised[budgetRange as '5k-7k']}
            <br />
            Project Type:{' '}
            {budgetType === BudgetType.Monthly ? 'monthly' : 'entire project'}
        </span>
    );

    const renderSuggestedSection = () => (
        <div className="suggested-section">
            <h4>Suggested</h4>
            <div className="pills-wrapper">
                {(suggestedThings?.filter(selectedThingsCriteria) ?? [])
                    .slice(0, 16)
                    .map(item => (
                        <Pill
                            key={`${item.id} ${item.name}`}
                            label={item.name}
                            type="button"
                            iconSide="left"
                            iconType="add"
                            onClick={() => addUniqueThings(item)}
                            disabled={isDisabledUniqueThings}
                        />
                    ))}
            </div>
        </div>
    );

    const renderSelectedTagsSection = () => {
        if (!fieldUniqueThings.value.length) {
            return null;
        }

        return (
            <div className="pills-wrapper selected">
                {fieldUniqueThings.value.map(item => (
                    <Pill
                        key={`${item.id} ${item.name}`}
                        label={item.name}
                        type="button"
                        iconSide="right"
                        iconType="remove"
                        onClick={() => removeUniqueThings(item.id)}
                    />
                ))}
            </div>
        );
    };

    return (
        <YourPitchStepStyled>
            <Label
                text="Message From the Team"
                subtext="Personalize your intro and tell the client why this project excites you."
                forId="pitch-details"
                id="pitch-details-label"
            >
                <Textarea
                    {...fieldPitchDetails}
                    placeholder="Hi X team! We’re so excited to pitch for this project. We’ve achieved exceptional results on similar projects for brands like..."
                    onBlur={fieldPitchDetails.onBlur}
                    maxLength={1000}
                    error={fieldPitchDetailsState.error?.message}
                    warning={getWarningLinkMessage(
                        fieldPitchDetails.value,
                        warningLinkMessage,
                    )}
                />
            </Label>
            <Label
                text="Your Approach"
                forId="agency-approach"
                id="agency-approach-label"
                subtext="Describe your approach to this project. Think - deliverables, timing, next steps."
                className="approach-label"
            >
                <div className="mobile-skills">{renderSkills()}</div>
                <Textarea
                    {...fieldApproach}
                    className="approach-note"
                    placeholder="We’ll begin with an audit of your social channels. Within two weeks, we’ll put together an extensive strategy including..."
                    error={fieldApproachState.error?.message}
                    warning={getWarningLinkMessage(
                        fieldApproach.value,
                        warningLinkMessage,
                    )}
                    maxLength={2500}
                />
                <div className="approach-links-wrapper">
                    {fieldApproachLinks.fields.map((item, index) => (
                        <ApproachLink
                            key={item.id}
                            index={index}
                            onRemove={() => fieldApproachLinks.remove(index)}
                        />
                    ))}
                    {fieldApproachLinks.fields.length < 3 && (
                        <LinkUi
                            title="+ Add Link"
                            variant="button"
                            onClick={() =>
                                fieldApproachLinks.append({
                                    title: '',
                                    link: '',
                                })
                            }
                        />
                    )}
                </div>
            </Label>
            <Label
                text="Budget Estimation"
                labelSubComponent={renderBudgetRangeRow()}
                subtext="Can you execute this project within the client’s budget range? Note: the range includes a 15% success fee paid to Breef by the agency."
                className="budget-range-label"
                forId="budget-range"
                id="budget-range-label"
            >
                <Range
                    className="budget-range"
                    value={fieldBudgetValue.value}
                    onChange={handleChangeBudgetValue}
                    list={listBudgetPitch}
                    isVisibleComment
                    isPreOpenComment
                    comment={fieldBudgetComment.value}
                    onChangeComment={fieldBudgetComment.onChange}
                    commentError={fieldBudgetCommentState.error?.message}
                    commentMaxLength={500}
                    commentPlaceholder="Add additional notes on the project budget"
                />
            </Label>
            <Label
                text="What Makes Us Different"
                subtext="Add (up to 10) things that make your agency unique."
                forId="makes-us-different"
                id="makes-us-different-field"
            >
                <Search
                    list={searchThingsResult ?? []}
                    onSelect={handleSelectUniqueThing}
                    select={fieldUniqueThings.value}
                    placeholder="Search"
                    isRemovable={false}
                    disabled={isDisabledUniqueThings || isCreatingTag}
                    customHandleSearch={setSearchThingName}
                    maxResults={5}
                    isDisplayListOnSearch
                    searchDebounce={300}
                    onAddItem={addNewTag}
                    isSearching={isLoadingSearchTags}
                />
                {renderSelectedTagsSection()}
                {renderSuggestedSection()}
                <div className="attention-note">
                    You’ll be able to upload documents + decks before submitting
                    your pitch.
                </div>
            </Label>
        </YourPitchStepStyled>
    );
};

export default YourPitchStep;

export const warningLinkMessage =
    'Please include any links through Add links feature.';

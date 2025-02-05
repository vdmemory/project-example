import { useGetList, useRouteControl } from '@breef/shared/hooks';
import { ListTimezonesType } from '@breef/shared/types';
import {
    ArrowRightSmallIcon,
    Button,
    DropDown,
    IntroCallAvailabilitySkeleton,
} from '@breef/ui-kit';
import { ReactNode, useEffect, useState } from 'react';
import { Dates } from './dates/Dates';
import { StyledIntroCallAvailability } from './IntroCallAvailability.styled';
import { Teammates } from './teammates/Teammates';
import { useAvailabilityControl } from '../../../hooks/useAvailabilityControl';
import { Moment } from 'moment';
import { getStartDay } from '../../../utils/getDays';
import { DayType } from '../../../types/projectAvailabilityTypes';
import { useValidationError } from '../../../hooks/useValidationError';
import { filterDays } from '../../../utils/filterDays';
import { useLazyGetAvailabilityQuery } from '@breef/shared/data-access-project-availability';
import { useLazyGetTeamMembersQuery } from '@breef/shared/data-access-profile';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useProjectAvailabilityActions } from '../../../store/hooks';

interface IntroCallAvailabilityProps {
    onPrev: () => void;
    onNext: () => void;
}

const title = 'Set Your Availability';
const description = `Select at least 4 hours of availability across a few days. We recommend scheduling your \nmeetings within the next week.`;
const step1 = 'Step 1: Set Timezone';
const step2 = 'Step 2: Add Dates & Times';
const step3 = 'Step 3: Add Teammates';

const START_WITH = 2;

export const IntroCallAvailability = ({
    onPrev,
    onNext,
}: IntroCallAvailabilityProps) => {
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || 0;

    const [startDateState, setStartDateState] = useState<Moment | null>(null);
    const [blockedDateState, setBlockedDateState] = useState<Moment | null>(
        null,
    );

    const [filteredDays, setFilteredDays] = useState<DayType[]>([]);
    const listTimezones = useGetList('groupedTimezones') as ListTimezonesType[];

    const [
        getAvailability,
        { isLoading: isLoadingAvailability, isError: isErrorAvailability },
    ] = useLazyGetAvailabilityQuery();
    const [getTeams, { isLoading: isLoadingTeam, isError: isErrorTeam }] =
        useLazyGetTeamMembersQuery();

    const fetchData = async () => {
        await getAvailability(projectId);
        await getTeams();
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isErrorAvailability || !isErrorTeam) return;
        toast.error('An error occurred while loading data from the server');
    }, [isLoadingAvailability, isErrorAvailability]);

    const callBackFunction = () => {
        onNext();
        fetchData();
    };

    const {
        data: { days, timezone, scheduleCreatedAt },
        methods: {
            handleChangeTimezone,
            handleChangeDay,
            handleChangeTimeSlot,
            handleRemoveDay,
            handleSubmit,
            handleCurrentSelectDay,
        },
        isSubmittedSetAvailability,
        isEditingAvailability,
        isDisabledNext,
    } = useAvailabilityControl({ cbFunction: callBackFunction });
    const { resetAvailability } = useProjectAvailabilityActions();
    const { getErrors } = useValidationError();

    useEffect(() => {
        return () => {
            resetAvailability();
        };
    }, []);

    useEffect(() => {
        const filteredDays = filterDays(days, startDateState);
        setFilteredDays(filteredDays);
    }, [days, startDateState]);

    const errorsSlots = getErrors(filteredDays);

    useEffect(() => {
        if (!timezone) return;

        // start date
        let start = START_WITH;
        if (isEditingAvailability || scheduleCreatedAt) start = 0;
        const startDate = getStartDay(timezone, start);
        setStartDateState(startDate);

        // blocked date
        const blockedDate = scheduleCreatedAt
            ? moment(scheduleCreatedAt)
                  .tz(timezone)
                  .add(1, 'day')
                  .startOf('day')
            : null;
        setBlockedDateState(blockedDate);
    }, [timezone, isEditingAvailability, scheduleCreatedAt]);

    const handleNext = () => {
        if (isDisabledNext || !startDateState) return;
        handleSubmit(startDateState, null, null);
    };

    const isLoading =
        !timezone || !startDateState || isLoadingAvailability || isLoadingTeam;
    if (isLoading) return <IntroCallAvailabilitySkeleton />;

    const optionTimezone = {
        value: timezone,
        label: timezone,
    };

    return (
        <StyledIntroCallAvailability>
            <div className="titles">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="sections">
                <div className="section left">
                    <Block label={step1}>
                        <DropDown
                            className="timezone"
                            small
                            isGrouped
                            options={listTimezones}
                            option={optionTimezone}
                            onSelect={option =>
                                handleChangeTimezone(option.value)
                            }
                            placeholder="Select timezone"
                        />
                    </Block>
                    <Block label={step2}>
                        <Dates
                            startDate={startDateState}
                            blockedDate={blockedDateState || null}
                            days={filteredDays}
                            errorsSlots={errorsSlots}
                            onSelectDay={(day: Moment) => {
                                handleChangeDay(day);
                                handleCurrentSelectDay(day);
                            }}
                            onChangeSlot={handleChangeTimeSlot}
                            onRemoveDay={handleRemoveDay}
                        />
                    </Block>
                </div>
                <div className="section right">
                    <Block label={step3}>
                        <Teammates />
                    </Block>
                </div>
            </div>
            <div className="buttons">
                <div className="left"></div>
                <div className="right">
                    <Button
                        variant="ghost"
                        className="back"
                        label="Back"
                        size="medium"
                        onClick={onPrev}
                        isDisabled={false}
                        isUppercase
                        iconPlacement="left"
                        icon={<ArrowRightSmallIcon />}
                    />
                    <Button
                        className="submit"
                        label="Submit"
                        size="medium"
                        onClick={handleNext}
                        isDisabled={isDisabledNext}
                        isUppercase
                        iconPlacement="right"
                        icon={<ArrowRightSmallIcon />}
                        isSubmitted={isSubmittedSetAvailability}
                    />
                </div>
            </div>
        </StyledIntroCallAvailability>
    );
};

const Block = ({ label, children }: { label: string; children: ReactNode }) => {
    return (
        <div className="block">
            <label>{label}</label>
            {children}
        </div>
    );
};

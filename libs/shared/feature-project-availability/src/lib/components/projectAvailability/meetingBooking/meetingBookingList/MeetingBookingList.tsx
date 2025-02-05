import { CheckMinIcon } from '@breef/shared/assets';
import { SlotBookingType } from '../../../../types/projectAvailabilityTypes';
import { getAmPmBookMeeting } from '../../../../utils';
import { Placeholder } from '../../placeholder/Placeholder';
import { StyledMeetingBookingList } from './MeetingBookingList.styled';

interface MeetingBookingListProps {
    list: SlotBookingType[] | null;
    onSelect: (day: SlotBookingType | null) => void;
    selected?: SlotBookingType | null;
}

const PLACEHOLDER_TITLE = `Please select a day\n first on the left.`;

export const MeetingBookingList = ({
    list,
    onSelect,
    selected,
}: MeetingBookingListProps) => {
    const handleSelect = (slot: SlotBookingType) => {
        if (!list) return;
        if (selected?.id === slot.id) {
            onSelect(null);
            return;
        }
        const selectedBookingDay: SlotBookingType = { ...slot };
        onSelect(selectedBookingDay);
    };

    const renderBookingSlots = (slot: SlotBookingType) => {
        const isSelected = selected?.id === slot.id;
        return (
            <button
                key={slot.id}
                className={`booking-slot ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(slot)}
            >
                <CheckMinIcon className="check-icon" />
                <span className="time-from-to">
                    {getAmPmBookMeeting(slot.fromTime)} -{' '}
                    {getAmPmBookMeeting(slot.toTime)}
                </span>
            </button>
        );
    };

    if (!list || list.length === 0)
        return <Placeholder title={PLACEHOLDER_TITLE} />;

    return (
        <StyledMeetingBookingList
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {list.map(renderBookingSlots)}
        </StyledMeetingBookingList>
    );
};

import { StyledInnerDatePicker } from './InnerDatePicker.styled';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useState } from 'react';

interface DefaultInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minDate?: Date;
    dateFormat?: string;
    localeFormat?: boolean;
}

export const InnerDatePicker = ({
    value,
    onChange,
    placeholder = 'Select date',
    minDate = new Date(),
    dateFormat = 'MMMM DD, yyyy',
    localeFormat = false,
}: DefaultInputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const formatMomentValue = (value: string, dateFormat: string) => {
        if (localeFormat) {
            return moment(value).format('L');
        }
        return moment(value).format(dateFormat);
    };
    return (
        <StyledInnerDatePicker>
            <DatePicker
                dateFormat={`${dateFormat}`}
                value={value ? formatMomentValue(value, dateFormat) : undefined}
                selected={value ? moment(value).toDate() : null}
                onChange={date => {
                    const currentDate = new Date();
                    onChange(
                        moment(
                            date?.setHours(
                                currentDate.getHours(),
                                currentDate.getMinutes(),
                                currentDate.getSeconds(),
                                currentDate.getMilliseconds(),
                            ),
                        ).format('YYYY-MM-DD HH:mm:ss'),
                    );
                }}
                onSelect={(date, e) => {
                    e?.preventDefault();
                    setIsOpen(false);
                }}
                onKeyDown={e => e.preventDefault()}
                placeholderText={placeholder}
                minDate={minDate}
                open={isOpen}
                onInputClick={() => setIsOpen(true)}
                onClickOutside={e => {
                    if (e.type !== 'touchstart') {
                        setIsOpen(false);
                    }
                }}
            />
        </StyledInnerDatePicker>
    );
};

export default InnerDatePicker;

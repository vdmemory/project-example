import moment from 'moment';

export const getAmPmAvailability = (time: string) => {
    const timeFormatted = moment(time, 'HH:mm').format('hh:mm a');
    return time !== '23:59' ? timeFormatted : '12:00 am';
};

export const getAmPmBookMeeting = (time: string) => {
    return moment(time).utcOffset(time).format('h:mm a');
};

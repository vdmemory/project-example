import moment from 'moment';

export const getNextTime = (current: string, next: string) =>
    moment(current, 'HH:mm').add(moment.duration(next)).format('HH:mm');

export const getNextSlot = (time: string, id: number) => {
    return {
        id,
        from: getNextTime(time, '0:00'),
        to: time !== '23:00' ? getNextTime(time, '1:00') : '23:59',
        isBooked: false,
    };
};

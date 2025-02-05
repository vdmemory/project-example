import moment from 'moment';

export const getUtcDateString = (date: string) => {
    return moment(date).utc().format('YYYY-MM-DD');
};

export const getLocaleDateString = (date: string) => {
    return moment.utc(date).local().format('YYYY-MM-DD');
};

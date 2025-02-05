import router from 'next/router';

export const getAppType = () => {
    switch (router.basePath) {
        case '/client':
            return 'client';
        case '/agency':
            return 'agency';
        default:
            return 'public';
    }
};

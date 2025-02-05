export const getHostName = () => {
    const { location } = window;
    return location.hostname === 'localhost'
        ? 'localhost:4200'
        : `https://${location.hostname}`;
};

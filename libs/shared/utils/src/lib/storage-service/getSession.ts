export const getSessionCookie = () => {
    try {
        return document.cookie.match(/sessionid=[^;]+/i);
    } catch (exception) {
        console.error(exception);
        return null;
    }
};

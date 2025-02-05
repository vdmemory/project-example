export const linkClick = (link: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.click();
    a.remove();
};

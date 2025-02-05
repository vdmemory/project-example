/* eslint-disable @typescript-eslint/ban-ts-comment */
describe('linkClick', () => {
    const originalCreateElement = document.createElement;

    beforeEach(() => {
        // @ts-ignore
        document.createElement = jest.fn(() => {
            return {
                setAttribute: jest.fn(),
                click: jest.fn(),
                remove: jest.fn(),
            };
        });
    });

    afterEach(() => {
        document.createElement = originalCreateElement;
    });

    it('should create an anchor tag, set its attributes, and simulate a click', () => {
        const link = 'http://example.com';
        require('./simulationLinkClick').linkClick(link); // eslint-disable-line

        // @ts-ignore
        const mockAnchor = document.createElement.mock.results[0].value;
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(mockAnchor.setAttribute).toHaveBeenCalledWith('href', link);
        expect(mockAnchor.setAttribute).toHaveBeenCalledWith(
            'target',
            '_blank',
        );
        expect(mockAnchor.click).toHaveBeenCalled();
        expect(mockAnchor.remove).toHaveBeenCalled();
    });
});

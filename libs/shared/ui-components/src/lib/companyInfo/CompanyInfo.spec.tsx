import { render, fireEvent, waitFor } from '@testing-library/react';
import CompanyInfo from './CompanyInfo';
import { useLazyGetAgencyPitchQuery } from '@breef/shared/data-access-project';
import 'intersection-observer';

const props = {
    companyLogoUrl:
        'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg',
    companyName: 'Test Company',
    officeLocation: 'Test Location',

    pitchId: 1,
    projectId: 1,
};

jest.mock('@breef/shared/data-access-project', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-project'),
    useLazyGetAgencyPitchQuery: jest.fn(),
}));

const getAgencyPitch = jest.fn();

(useLazyGetAgencyPitchQuery as jest.Mock).mockImplementation(() => [
    getAgencyPitch,
    { data: {}, isLoading: false },
]);

describe('CompanyInfo', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CompanyInfo {...props} />);
        expect(baseElement).toBeTruthy();
    });

    describe('Elements render CompanyInfo', () => {
        const testCases = [
            { name: 'Company Name', expected: 'Test Company' },
            { name: 'Test location', expected: 'Test Location' },
            { name: 'Link Button', expected: 'View Pitch' },
        ];

        testCases.forEach(testCase => {
            it(`should render successfully CompanyInfo with ${testCase.name}`, () => {
                const { getByText } = render(<CompanyInfo {...props} />);
                const element = getByText(testCase.expected);
                expect(element).toBeInTheDocument();
            });
        });
    });

    it(`should render successfully CompanyInfo with custom className`, () => {
        render(<CompanyInfo {...props} />);
        const element = document.querySelector('img');
        const src = element?.getAttribute('src');
        expect(src).toBeTruthy();
    });

    it(`should render successfully when click button view scope`, () => {
        const { getByTestId } = render(<CompanyInfo {...props} />);
        const element = getByTestId('button-container');
        fireEvent.click(element);
        expect(getAgencyPitch).toHaveBeenCalled();
    });
});

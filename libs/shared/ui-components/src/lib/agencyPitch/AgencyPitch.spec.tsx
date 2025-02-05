import { useMediaContext } from '@breef/shared/hooks';
import { render, screen } from '@testing-library/react';
import AgencyPitch from './AgencyPitch';
import { pitch } from './reviewPitch/ReviewPitch.spec';

const propsPitch = {
    pitchData: pitch,
};

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMaxMobile: false,
}));

describe('AgencyPitch', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<AgencyPitch {...propsPitch} />);
        expect(baseElement).toBeTruthy();
    });

    const testCasesTestId = [
        { name: 'company name', expected: 'test company name' },
        { name: 'location', expected: 'test location' },
        { name: 'skill', expected: 'test skill' },
        { name: 'approach description', expected: 'test approach description' },
        { name: 'approach link', expected: 'test approach link' },
        { name: 'about us', expected: 'test about us' },
        { name: 'tagline', expected: 'test tagline' },
        { name: 'pitch details', expected: 'test pitch details' },
        { name: 'link', expected: 'test link' },
        { name: 'attachment', expected: 'attachment 1' },
        { name: 'unique thing', expected: 'unique thing' },
        { name: 'note to breef', expected: 'test note to breef' },
        { name: 'client name', expected: 'Client Name' },
        { name: 'project name', expected: 'Project Name' },
        { name: 'project link', expected: 'Project Link' },
        { name: 'project link 2', expected: 'Project Link 2' },
        {
            name: 'previous work description',
            expected: 'test previous work description',
        },
    ];

    testCasesTestId.forEach(testCase => {
        it(`should render successfully SignIn with ${testCase.name}`, () => {
            render(<AgencyPitch {...propsPitch} />);
            const element = screen.getByText(testCase.expected);
            expect(element).toBeInTheDocument();
        });
    });
});

describe('ReviewPitch mobile', () => {
    it(`should render successfully ReviewPitch Mobile`, () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMaxMobile: true,
        }));
        const { baseElement } = render(<AgencyPitch {...propsPitch} />);
        expect(baseElement).toBeTruthy();
    });
});

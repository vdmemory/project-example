import { render } from '@testing-library/react';

import GetStartedWrapper from './GetStartedWrapper';

const defaultProps = {
    configTips: [
        {
            icon: <img alt="Empty Icon" />,
            label: 'Tip 1',
            note: 'Note 1',
        },
        {
            icon: <img alt="Empty Icon" />,
            label: 'Tip 2',
            note: 'Note 2',
        },
    ],
    isNumbering: false,
};
describe('GetStartedWrapper', () => {
    it('should render successfully', () => {
        const { baseElement, getByText } = render(
            <GetStartedWrapper {...defaultProps} />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByText('Tip 1')).toBeInTheDocument();
        expect(getByText('Tip 2')).toBeInTheDocument();
    });
    it('should render Tips with numbers successfully', () => {
        const { getByText } = render(
            <GetStartedWrapper {...defaultProps} isNumbering={true} />,
        );
        expect(getByText('1. Tip 1')).toBeInTheDocument();
        expect(getByText('2. Tip 2')).toBeInTheDocument();
    });
});

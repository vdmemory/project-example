import { render } from '@testing-library/react';
import TermsOfUseStandard from './TermsOfUseStandard';

describe('TermsOfUseStandard', () => {
    it('should render successfully ', () => {
        const { baseElement } = render(<TermsOfUseStandard role="client" />);
        expect(baseElement).toBeTruthy();
    });
});

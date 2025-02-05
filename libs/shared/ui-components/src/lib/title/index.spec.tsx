import { render, screen } from '@testing-library/react';

import TitleStep from './TitleStep';

const props = {
    title: 'Title for title step',
};

const allProps = {
    step: 1,
    numberSteps: 1,
    title: 'Title for title step',
    className: 'class-title',
    subTitle: 'class-subtitle',
};

describe('TitleStep', () => {
    it('should render InnerToolTipSymbol successfully ', () => {
        const { baseElement } = render(<TitleStep {...props} />);

        expect(baseElement).toBeTruthy();
        expect(
            baseElement.getElementsByClassName('step-title')[0].textContent,
        ).toEqual(props.title);
    });
});

describe('InnerToolTipSymbol with all props', () => {
    it('should render InnerToolTipSymbol with all props successfully ', () => {
        const { baseElement } = render(<TitleStep {...allProps} />);

        expect(baseElement).toBeTruthy();
        const subtitle = screen.getAllByRole('heading', { level: 4 });
        expect(subtitle[0].textContent).toEqual(allProps.subTitle);
        expect(
            baseElement.getElementsByClassName('step-number')[0].textContent,
        ).toEqual(`${allProps.numberSteps}/${allProps.step}`);
    });
});

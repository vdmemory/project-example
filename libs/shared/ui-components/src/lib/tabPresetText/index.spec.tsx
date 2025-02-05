import { fireEvent, render, screen } from '@testing-library/react';

import { TabPresetText } from './TabPresetText';

const handleChange = jest.fn();

const propsTabPresetText = {
    handleChange: handleChange,
    presetTextPlaceholder: 'presetTextPlaceholder',

    children: <div>Children</div>,
    textMaxLength: 100,
};

describe('PresetText', () => {
    it('should render successfully TabPresetText', () => {
        const { baseElement } = render(
            <TabPresetText presetText="presetText" {...propsTabPresetText} />,
        );
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully TabPresetText with preset text', () => {
        render(
            <TabPresetText presetText="presetText" {...propsTabPresetText} />,
        );
        expect(screen.getByText('presetText')).toBeInTheDocument();
    });
    it('should render successfully TabPresetText with out preset text', () => {
        render(<TabPresetText presetText="" {...propsTabPresetText} />);
        expect(
            screen.queryByText('presetTextPlaceholder'),
        ).not.toBeInTheDocument();
    });
    it('should render successfully TabPresetText with children', () => {
        render(<TabPresetText presetText="" {...propsTabPresetText} />);
        expect(screen.queryByText('Children')).toBeInTheDocument();
    });
    it('should render successfully TabPresetText with correct character count when missing presetText', () => {
        render(<TabPresetText presetText="" {...propsTabPresetText} />);
        expect(screen.getByText('0/100')).toBeInTheDocument();
    });
    it('should render successfully TabPresetText with correct character count when presetText not empty', () => {
        render(
            <TabPresetText presetText="presetText" {...propsTabPresetText} />,
        );
        expect(
            screen.getByText(`${'presetText'.length}/100`),
        ).toBeInTheDocument();
    });
    it('should render successfully TabPresetText with action handleChange', async () => {
        render(
            <TabPresetText presetText="presetText" {...propsTabPresetText} />,
        );
        const textarea = screen.getByText('presetText');
        await fireEvent.change(textarea, { target: { value: 'test' } });
        expect(handleChange).toBeCalledTimes(1);
    });
});

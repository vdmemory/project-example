import { fireEvent, render } from '@testing-library/react';
import 'intersection-observer';
import ButtonLogo from './ButtonLogo';

const onClick = jest.fn();

const props = {
    onClick,
};
describe('ButtonLogo', () => {
    it('should render successfully', () => {
        const { baseElement, getByRole } = render(
            <ButtonLogo
                isDisabled={false}
                isLoading={false}
                value="data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4="
                {...props}
            />,
        );
        expect(baseElement).toBeTruthy();
        expect(getByRole('img').getAttribute('src')).toEqual(
            'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=',
        );
        expect(getByRole('button').getAttribute('class')).toEqual(
            'button-image',
        );
        expect(getByRole('button').getAttribute('disabled')).toBeNull();
    });
    it('should render successfully with isDisabled and not a value', () => {
        const { queryByRole, getByRole } = render(
            <ButtonLogo
                isDisabled={true}
                isLoading={false}
                value=""
                {...props}
            />,
        );
        expect(queryByRole('img')).toBeNull();
        expect(getByRole('button').getAttribute('class')).toEqual(
            'button-upload',
        );
        expect(getByRole('button').getAttribute('disabled')).not.toBeNull();
    });
    it('should render successfully with action when button disabled', () => {
        const { getByRole } = render(
            <ButtonLogo
                isDisabled={true}
                isLoading={false}
                value=""
                {...props}
            />,
        );
        fireEvent.click(getByRole('button'));
        expect(onClick).toBeCalledTimes(0);
    });
    it('should render successfully with action', () => {
        const { getByRole } = render(
            <ButtonLogo
                isDisabled={false}
                isLoading={false}
                value=""
                {...props}
            />,
        );
        fireEvent.click(getByRole('button'));
        expect(onClick).toBeCalledTimes(1);
    });
    it('should render successfully with loading component', () => {
        const { getByTestId, queryByRole } = render(
            <ButtonLogo
                isDisabled={false}
                isLoading={true}
                value=""
                {...props}
            />,
        );
        expect(getByTestId('spinner')).toBeDefined();
        expect(queryByRole('button')).toBeNull();
    });
});

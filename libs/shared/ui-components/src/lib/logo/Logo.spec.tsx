import { render, screen } from '@testing-library/react';
import 'intersection-observer';
import Logo from './Logo';

describe('PageLoader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Logo />);
        expect(baseElement).toBeTruthy();
        expect(screen.queryByRole('img')).toBeNull();
    });
    it('should render successfully', () => {
        render(
            <Logo logo="data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=" />,
        );
        expect(screen.queryByRole('img')).toBeDefined();
        expect(screen.queryByRole('img')?.getAttribute('src')).toEqual(
            'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=',
        );
    });
});

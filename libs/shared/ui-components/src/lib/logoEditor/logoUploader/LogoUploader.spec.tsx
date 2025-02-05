import { render } from '@testing-library/react';
import { LogoUploader } from './LogoUploader.component';
import { configureStore } from '@reduxjs/toolkit';
import { apiCreateUpload, apiUpload } from '@breef/shared/data-access-upload';
import { Provider } from 'react-redux';
import 'intersection-observer';

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiCreateUpload.reducerPath]: apiCreateUpload.reducer,
        [apiUpload.reducerPath]: apiUpload.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiCreateUpload.middleware,
            apiUpload.middleware,
        ),
});

const logoUrl =
    'data:image/svg+xml;base64,PHN2ZyBpZD0iY2lyY2xlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MS40MTQyMTsiPgoKICAgIDxzdHlsZT4KICAgICAgICAjbWFzayB7CiAgICAgICAgICAgIGFuaW1hdGlvbjogbWFzayAxLjJzIGVhc2UgaW5maW5pdGU7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIG1hc2sgewogICAgICAgICAgICBmcm9tIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTgwcHgpCiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIHRvIHsKICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxODBweCkKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CgogICAgPGRlZnM+CgogICAgICAgIDxtYXNrIGlkPSJtYXNrLWVsZW1lbnQiPgoKICAgICAgICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGlkPSJjaXJjbGUiIGZpbGw9IiM3MjcxNzEiIC8+CgogICAgICAgICAgICA8cGF0aCBmaWxsPSJoc2xhKDIwMCwwJSwxMCUsLjYpIiBpZD0ibWFzayIgZD0iTTgyLDY3LjVsMCwzNWwtNjUsMGwwLC0xMDVsMCwwbDY1LDBaIiAvPgoKICAgICAgICA8L21hc2s+CgogICAgPC9kZWZzPgoKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBtYXNrPSJ1cmwoI21hc2stZWxlbWVudCkiIGlkPSJjaXJjbGUiIGZpbGw9IiNkYWRhZGEiIC8+Cgo8L3N2Zz4=';

describe('LogoUploader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={mockConfiguredStore}>
                <LogoUploader />
            </Provider>,
        );
        const input =
            baseElement.getElementsByClassName('input-file-upload')[0];
        const button = baseElement.getElementsByClassName('button-upload')[0];
        expect(input).toBeDefined();
        expect(button).toBeDefined();
        expect(baseElement).toBeTruthy();
    });

    it('should be successfully displayed with the value parameter empty', () => {
        const { baseElement, getByText } = render(
            <Provider store={mockConfiguredStore}>
                <LogoUploader />
            </Provider>,
        );
        const iconUpload =
            baseElement.getElementsByTagName('reactcomponent')[1];
        expect(iconUpload).toBeDefined();
        expect(getByText('Upload Logo')).toBeInTheDocument();
    });

    it('should be successfully displayed with the value parameter exist', () => {
        const { getByAltText } = render(
            <Provider store={mockConfiguredStore}>
                <LogoUploader logoUrl={logoUrl} />
            </Provider>,
        );

        const srcImage = getByAltText('Logo Icon');
        expect(srcImage).toBeInTheDocument();
        expect(srcImage).toHaveAttribute('src', logoUrl);
    });
});

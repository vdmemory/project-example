import { fireEvent, render } from '@testing-library/react';
import { Header } from './Header';

const handleClick = jest.fn();

describe('Header', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Header buttonTitle="exit" onClick={handleClick} />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should render successfully logo link', () => {
        const { baseElement } = render(
            <Header buttonTitle="exit" onClick={handleClick} />,
        );
        const logo = baseElement.querySelector('a.link-logo');
        const href = logo?.getAttribute('href');
        expect(logo).toBeTruthy();
        expect(href).toBe('/projects');
    });

    it('should render successfully button exit', () => {
        const { baseElement, getByText } = render(
            <Header buttonTitle="exit" onClick={handleClick} />,
        );
        const logo = baseElement.querySelector('a.link-logo');
        const href = logo?.getAttribute('href');
        const name = getByText('exit');
        expect(logo).toBeTruthy();
        expect(href).toBe('/projects');
        expect(name).toBeInTheDocument();
    });

    it('should call handleClick on button click successfully', () => {
        const { getByTestId } = render(
            <Header buttonTitle="exit" onClick={handleClick} />,
        );
        const wrapper = getByTestId('button-container');
        fireEvent.click(wrapper);
        expect(handleClick).toBeCalled();
    });
});

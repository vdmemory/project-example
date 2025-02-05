import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

const handleClick = jest.fn();

describe('Button', () => {
    it('should render successfully Button', () => {
        const { baseElement } = render(<Button type="button" />);
        expect(baseElement).toBeTruthy();
    });
    it('should render successfully Button with type button', () => {
        render(<Button type="button" />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('button');
    });
    it('should render successfully Button with type button', () => {
        render(<Button type="submit" />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toEqual('submit');
    });
    it('should render successfully Button with default colors', () => {
        render(<Button type="submit" />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('color')).toEqual('primary');
    });
    it('should render successfully Button with props colors', () => {
        render(<Button type="submit" color="secondary" />);
        const button = screen.getByRole('button');
        expect(button.getAttribute('color')).toEqual('secondary');
    });
    it('should render successfully Button with props disabled', () => {
        render(<Button type="submit" color="secondary" disabled={true} />);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
    it('should render successfully Button with out props disabled', () => {
        render(<Button type="submit" color="secondary" disabled={false} />);
        const button = screen.getByRole('button');
        expect(button).not.toBeDisabled();
    });
    it('should render successfully Button with props subtitle ', () => {
        render(<Button type="submit" subtitle="subtitle" />);
        const subtitle = screen.getByText('subtitle');
        expect(subtitle).toBeInTheDocument();
    });
    it('should render successfully Button with props isLoading ', () => {
        const { baseElement } = render(
            <Button type="submit" subtitle="subtitle" isLoading={true} />,
        );
        const loadingComponent = baseElement.getElementsByClassName('spinner');
        expect(loadingComponent[0]).toBeDefined();
    });
    it('should render successfully Button with  props isLoading=false ', () => {
        const { baseElement } = render(
            <Button type="submit" subtitle="subtitle" isLoading={false} />,
        );
        const loadingComponent = baseElement.getElementsByClassName('spinner');
        expect(loadingComponent[0]).not.toBeDefined();
    });
    it('should render successfully Button with  props arrowLeft ', () => {
        const { baseElement } = render(
            <Button
                type="submit"
                subtitle="subtitle"
                isSubmitting={false}
                isLoading={false}
                arrowLeft={true}
            />,
        );
        const loadingComponent =
            baseElement.getElementsByClassName('arrow-left');
        expect(loadingComponent[0]).toBeDefined();
    });
    it('should render successfully Button with  props arrowRight ', () => {
        const { baseElement } = render(
            <Button
                type="submit"
                subtitle="subtitle"
                isSubmitting={false}
                isLoading={false}
                arrowRight={true}
            />,
        );
        const loadingComponent =
            baseElement.getElementsByClassName('arrow-right');
        expect(loadingComponent[0]).toBeDefined();
    });
    it('should render successfully Button with  props title ', () => {
        render(
            <Button
                type="submit"
                subtitle="subtitle"
                isSubmitting={false}
                isLoading={false}
                title="title button"
            />,
        );
        const title = screen.getByText('title button');
        expect(title).toBeInTheDocument();
    });
    it('should render successfully Button with  props children ', () => {
        render(
            <Button
                type="submit"
                subtitle="subtitle"
                isSubmitting={false}
                isLoading={false}
                title="title button"
                children={<div>Children Component</div>}
            />,
        );
        const children = screen.getByText('Children Component');
        expect(children).toBeInTheDocument();
    });
    it('should render successfully Button with action click', async () => {
        render(
            <Button
                type="submit"
                color="secondary"
                disabled={false}
                onClick={handleClick}
            />,
        );
        const button = screen.getByRole('button');
        await fireEvent.click(button);
        expect(handleClick).toBeCalledTimes(1);
    });
});

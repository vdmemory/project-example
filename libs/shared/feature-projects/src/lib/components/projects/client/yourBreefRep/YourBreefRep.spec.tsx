import { render } from '@testing-library/react';

describe('ChipDropdownDefinesList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>hello</div>);
        expect(baseElement).toBeTruthy();
    });
});

// TODO: write tests!!

// import { render, screen } from '@testing-library/react';
// import { YourBreefRep } from './YourBreefRep';

// type MatchMediaMock = {
//     matches: boolean;
//     addEventListener: jest.Mock;
//     removeEventListener: jest.Mock;
// };

// const matchMediaMock =
//     (matches: boolean): (() => MatchMediaMock) =>
//     () => ({
//         matches,
//         addEventListener: jest.fn(),
//         removeEventListener: jest.fn(),
//     });
// const props = {
//     userFirstName: 'Ustes',
//     helpText: 'Hey {name}, let me know if you have any questions!',
//     logoUrl: '',
//     leadFirstName: 'Breef',
//     leadLastName: 'Rep',
//     calendlyLink: 'test.com',
//     role: 'client' as 'client' | 'agency',
// };

// const propsEmpty = {
//     userFirstName: '',
//     helpText: 'Hey {name}, let me know if you have any questions!',
//     logoUrl: '',
//     leadFirstName: '',
//     leadLastName: '',
//     calendlyLink: '',
//     role: 'client' as 'client' | 'agency',
// };

// describe('Project YourBreefRep', () => {
//     const originalMatchMedia = window.matchMedia;

//     beforeEach(() => {
//         window.matchMedia = matchMediaMock(false) as unknown as (
//             query: string,
//         ) => MediaQueryList;
//     });

//     afterEach(() => {
//         window.matchMedia = originalMatchMedia;
//     });
//     it('should render successfully', () => {
//         const { baseElement } = render(<YourBreefRep {...props} />);
//         expect(baseElement).toBeTruthy();
//         expect(screen.getByTestId('name').textContent).toBe(
//             `${props.leadFirstName} ${props.leadLastName}`,
//         );
//         expect(screen.getByTestId('description').textContent).toBe(
//             `Hey ${props.userFirstName}, let me know if you have any questions!`,
//         );
//         expect(screen.getByTestId('label').textContent).toBe(`Your brand lead`);
//     });

//     it('should render successfully Empty Props', () => {
//         const { baseElement } = render(<YourBreefRep {...propsEmpty} />);
//         expect(baseElement).toBeTruthy();
//         expect(screen.getByTestId('name').textContent).toBe('Breef Team');
//         expect(screen.getByTestId('description').textContent).toBe(
//             `Hey user, let me know if you have any questions!`,
//         );
//         expect(screen.getByTestId('label').textContent).toBe(`Your brand lead`);
//     });
// });

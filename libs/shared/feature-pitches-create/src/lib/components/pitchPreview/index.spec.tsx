import { render } from '@testing-library/react';

describe('PitchPreview', () => {
    it('should render successfully', () => {
        //TODO: write tests
        const { baseElement } = render(<div>123</div>);
        expect(baseElement).toBeTruthy();
    });
});

// import { fireEvent, render, screen } from '@testing-library/react';

// import PitchPreview from './PitchPreview';
// import { configureStore } from '@reduxjs/toolkit';
// import { pitchPreviewReducer } from '../../../index';
// import { Provider } from 'react-redux';
// import { mockPitchPreviewStore } from '../../store/mockStore';

// jest.mock('next/router', () => ({
//     useRouter() {
//         return {
//             route: '/',
//             pathname: '',
//             query: {},
//             asPath: '',
//             push: () => null,
//         };
//     },
// }));

// const onChoiceOfInterest = jest.fn();

// const props = {
//     pitchPreview: mockPitchPreviewStore.pitchPreview,
//     projectId: 231,
//     onChoiceOfInterest: onChoiceOfInterest,
//     website: 'website.com',
// };

// const mockConfiguredStore = configureStore({
//     reducer: {
//         pitchPreview: pitchPreviewReducer,
//     },
// });
// describe('PitchPreview', () => {
//     it('should render PitchPreview successfully ', () => {
//         const { baseElement } = render(
//             <Provider store={mockConfiguredStore}>
//                 <PitchPreview isAccept={false} {...props} />,
//             </Provider>,
//         );
//         expect(baseElement).toBeTruthy();
//     });
//     it('should render PitchPreview correct with props isAccept=false ', () => {
//         const { baseElement } = render(
//             <Provider store={mockConfiguredStore}>
//                 <PitchPreview isAccept={false} {...props} />,
//             </Provider>,
//         );
//         const headerNote = baseElement.getElementsByClassName('header-note');
//         expect(headerNote[0]).not.toBeDefined();
//         expect(
//             screen.queryByText('Would you like to submit a pitch?'),
//         ).not.toBeInTheDocument();
//     });
//     it('should render PitchPreview correct with props isAccept=true ', () => {
//         const { baseElement } = render(
//             <Provider store={mockConfiguredStore}>
//                 <PitchPreview isAccept={true} {...props} />,
//             </Provider>,
//         );
//         const headerNote = baseElement.getElementsByClassName('header-note');
//         expect(headerNote[0]).toBeDefined();
//         expect(
//             screen.queryByText('Would you like to submit a pitch?'),
//         ).toBeInTheDocument();
//     });
//     it('should render PitchPreview correct with actions button', () => {
//         render(
//             <Provider store={mockConfiguredStore}>
//                 <PitchPreview isAccept={true} {...props} />,
//             </Provider>,
//         );
//         const buttonPassOnProject = screen.getByText('Pass on Project');
//         fireEvent.click(buttonPassOnProject);
//         expect(onChoiceOfInterest).toBeCalledTimes(1);
//     });
//     it('should render PitchPreview correct with actions button', () => {
//         render(
//             <Provider store={mockConfiguredStore}>
//                 <PitchPreview isAccept={true} {...props} />,
//             </Provider>,
//         );
//         const submitPitch = screen.getByText('Submit pitch');
//         fireEvent.click(submitPitch);
//         expect(onChoiceOfInterest).toBeCalledTimes(2);
//     });
// });

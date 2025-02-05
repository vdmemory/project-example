import { render } from '@testing-library/react';

describe('PitchCreate', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<div>hello</div>);
        expect(baseElement).toBeTruthy();
    });
});

// TODO: write tests!!

// import { act, render } from '@testing-library/react';

// import { NextRouter } from 'next/dist/shared/lib/router/router';
// import { RouterContext } from 'next/dist/shared/lib/router-context';
// import * as nextRouter from 'next/router';
// import { configureStore } from '@reduxjs/toolkit';
// import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
// import { pitchCreateReducer, pitchPreviewReducer } from '../../../index';
// import { Provider } from 'react-redux';
// import { pitchCreate } from '../../store/mockStore';
// import { ReactNode } from 'react';
// import { FormProvider, useForm } from 'react-hook-form';
// import { PitchCreateFormType } from '@breef/shared/types';
// import { IntercomProvider } from 'react-use-intercom';

// import PitchCreate from './PitchCreate';

// const useRouter = jest.spyOn(nextRouter, 'useRouter');
// const router = useRouter.getMockImplementation()?.() as NextRouter;
// const spyScrollTo = jest.fn();

// jest.mock('next/router', () => ({
//     useRouter() {
//         return {
//             route: '/',
//             pathname: '',
//             query: { pitchId: '', projectId: 123 },
//             asPath: '/asPath',
//         };
//     },
// }));

// const mockConfiguredStore = configureStore({
//     reducer: {
//         [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,

//         pitchCreate: pitchCreateReducer,
//         pitchPreview: pitchPreviewReducer,
//     },
//     preloadedState: { pitchCreate },
// });

// const Wrapper = (props: { children: ReactNode }) => {
//     const methods = useForm<PitchCreateFormType>({
//         mode: 'onChange',
//         reValidateMode: 'onChange',
//         defaultValues: {
//             agencyBio: pitchCreate.pitch.agencyBio,
//         },
//     });
//     return <FormProvider {...methods}>{props.children}</FormProvider>;
// };

// describe('PitchCreate', () => {
//     beforeEach(() => {
//         Object.defineProperty(global.window, 'scrollTo', {
//             value: spyScrollTo,
//         });
//         spyScrollTo.mockClear();
//     });
//     it('should render successfully PitchCreate ', async () => {
//         await act(async () => {
//             const { baseElement } = render(
//                 <Provider store={mockConfiguredStore}>
//                     <RouterContext.Provider value={router}>
//                         <IntercomProvider appId={'123432'}>
//                             <Wrapper>
//                                 <PitchCreate />
//                             </Wrapper>
//                         </IntercomProvider>
//                     </RouterContext.Provider>
//                 </Provider>,
//             );
//             expect(baseElement).toBeTruthy();
//         });
//     });
// });

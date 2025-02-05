import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './projectsSlice';

const actions = {
    ...sliceActions,
};

export const useProjectsSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const useProjectsActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

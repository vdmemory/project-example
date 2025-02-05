import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './projectAvailabilitySlice';

const actions = {
    ...sliceActions,
};

export const useProjectAvailabilitySelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const useProjectAvailabilityActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

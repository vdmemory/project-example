import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './profileSlice';

const actions = {
    ...sliceActions,
};

export const useProfileSelector: TypedUseSelectorHook<SliceState> = useSelector;

export const useProfileActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

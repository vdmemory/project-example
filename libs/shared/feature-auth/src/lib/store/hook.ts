import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './authSlice';

const actions = {
    ...sliceActions,
};

export const useAuthSelector: TypedUseSelectorHook<SliceState> = useSelector;

export const useAuthActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './pitchListByClient';

const actions = {
    ...sliceActions,
};

export const usePitchListSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const usePitchListActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

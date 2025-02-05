import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './kickoffSlice';

const actions = {
    ...sliceActions,
};

export const useKickoffSelector: TypedUseSelectorHook<SliceState> = useSelector;

export const useKickoffActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './projectPostSlice';

const actions = {
    ...sliceActions,
};

export const useProjectPostSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const useProjectPostActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

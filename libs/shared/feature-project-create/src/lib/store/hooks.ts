import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './projectCreateSlice';

const actions = {
    ...sliceActions,
};

export const useProjectCreateSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const useProjectCreateActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

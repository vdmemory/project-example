import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './dashboardSlice';

const actions = {
    ...sliceActions,
};

export const useDashboardSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const useDashboardActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

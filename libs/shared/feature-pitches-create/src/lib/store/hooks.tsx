import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sliceActions, SliceState } from './pitchCreateSlice';
import { previewPitchActions, SlicePreviewState } from './pitchPreviewSlice';

const actions = {
    ...sliceActions,
};

const previewSliceActions = {
    ...previewPitchActions,
};

export const usePitchCreateSelector: TypedUseSelectorHook<SliceState> =
    useSelector;

export const usePitchCreateActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};

export const usePitchPreviewSelector: TypedUseSelectorHook<SlicePreviewState> =
    useSelector;

export const usePitchPreviewActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(previewSliceActions, dispatch);
};

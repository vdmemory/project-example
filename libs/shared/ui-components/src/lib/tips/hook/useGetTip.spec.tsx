/* eslint-disable @typescript-eslint/no-var-requires */
import { renderHook } from '@testing-library/react-hooks';
import { useGetTip } from './useGetTip';
import { TipsTypeKeys, TipType } from '../utils/types';

// Mock the tip handlers for each type
jest.mock('../utils/listTipsAgency', () => ({
    getTipAgency: jest.fn(),
}));
jest.mock('../utils/listTipsPitch', () => ({
    getTipPitchProfile: jest.fn(),
    getTipPitchBudget: jest.fn(),
    getTipPitchProject: jest.fn(),
}));
jest.mock('../utils/listTipsProject', () => ({
    getTipProjectInfoNotes: jest.fn(),
    getTipProjectOverview: jest.fn(),
    getTipProjectPhase: jest.fn(),
}));

describe('useGetTip', () => {
    it('returns tip for project overview', () => {
        const step = 1;
        const type: TipsTypeKeys = TipsTypeKeys.projectOverview;
        const expectedTip: TipType = {
            title: 'Project Overview Tip',
            description: 'This is a tip for project overview.',
        };
        // Mock the tipHandler function for project overview
        require('../utils/listTipsProject').getTipProjectOverview.mockReturnValue(
            expectedTip,
        );

        const { result } = renderHook(() => useGetTip(step, type));
        expect(result.current).toEqual(expectedTip);
    });

    it('returns tip array for pitch profile', () => {
        const step = 2;
        const type: TipsTypeKeys = TipsTypeKeys.pitchProfile;
        const expectedTipArray: TipType[] = [
            { title: 'Pitch Profile Tip 1', description: 'Tip description 1' },
            { title: 'Pitch Profile Tip 2', description: 'Tip description 2' },
        ];
        require('../utils/listTipsPitch').getTipPitchProfile.mockReturnValue(
            expectedTipArray,
        );

        const { result } = renderHook(() => useGetTip(step, type));
        expect(result.current).toEqual(expectedTipArray);
    });
});

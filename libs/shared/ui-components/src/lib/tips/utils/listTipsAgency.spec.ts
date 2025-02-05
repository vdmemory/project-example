import { getTipAgency } from './listTipsAgency';

describe('listTipsAgency', () => {
    it('getTipAgency should return correct value with step=1', () => {
        expect(getTipAgency(1)).toEqual({
            title: 'WHAT HAPPENS NEXT?',
            description: `Selecting a team begins the ‘home stretch.’ \n\nFrom here, you’ll work with the team to finalize timing, contracts + payments. \n\nNothing is ‘official’ until both sides agree.`,
        });
    });
    it('getTipAgency should return correct default value', () => {
        expect(getTipAgency(2)).toEqual({
            title: '',
            description: '',
        });
    });
});

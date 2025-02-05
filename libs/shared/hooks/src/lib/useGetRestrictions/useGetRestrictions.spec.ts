/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks';
import {
    CompanyPosition,
    Restrictions,
    restrictionsAgencyMembers,
    restrictionsClientMembers,
    restrictionsClientFinance,
    restrictionsAgencyFinance,
} from '@breef/shared/constants';
import { useGetRestrictions } from './useGetRestrictions';

jest.mock('@breef/shared/data-access-auth');

describe('useGetRestrictions', () => {
    const setup = (data: any) => {
        require('@breef/shared/data-access-auth').useGetSelfQuery.mockReturnValue(
            {
                data,
            },
        );

        return renderHook(() => useGetRestrictions());
    };

    it('should return true for client member if restriction is not in restrictionsClientMembers', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.member,
            companyType: 'client',
        });

        const restriction = Restrictions.agencies;
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            true,
        );
    });

    it('should return false for client member if restriction is in restrictionsClientMembers', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.member,
            companyType: 'client',
        });

        const restriction = restrictionsClientMembers[0];
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            false,
        );
    });

    it('should return true for agency member if restriction is not in restrictionsAgencyMembers', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.member,
            companyType: 'agency',
        });

        const restriction = Restrictions.agencies;
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            true,
        );
    });

    it('should return false for agency member if restriction is in restrictionsAgencyMembers', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.member,
            companyType: 'agency',
        });

        const restriction = restrictionsAgencyMembers[0];
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            false,
        );
    });
    it('should return true for client finance if restriction is not in restrictionsClientFinance', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.finance,
            companyType: 'client',
        });

        const restriction = Restrictions.agencies;
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            true,
        );
    });

    it('should return false for client finance if restriction is in restrictionsClientFinance', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.finance,
            companyType: 'client',
        });

        const restriction = restrictionsClientFinance[0];
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            false,
        );
    });

    it('should return true for agency finance if restriction is not in restrictionsAgencyFinance', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.finance,
            companyType: 'agency',
        });

        const restriction = Restrictions.agencies;
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            true,
        );
    });

    it('should return false for agency finance if restriction is in restrictionsAgencyFinance', () => {
        const { result } = setup({
            companyPosition: CompanyPosition.finance,
            companyType: 'agency',
        });

        const restriction = restrictionsAgencyFinance[0];
        expect(result.current.checkIsHaveRestriction({ restriction })).toBe(
            false,
        );
    });
});

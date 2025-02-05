/* eslint-disable  @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks';
import {
    useGetAgencyAdvantagesListQuery,
    useGetAgencyTimeFramesListQuery,
    useGetProjectGoalsListQuery,
    useGetTemplateTypesQuery,
} from '@breef/shared/data-access-project-create';
import { useGetList } from './useGetList';
import {
    useGetIdentitiesQuery,
    useGetIndustriesQuery,
} from '@breef/shared/data-access-profile';

jest.mock('@breef/shared/data-access-profile');
jest.mock('@breef/shared/data-access-project-create');

describe('useGetList', () => {
    const mockQueryReturnValue = {
        data: ['dummy data'],
    };

    (useGetIdentitiesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);
    (useGetIndustriesQuery as jest.Mock).mockReturnValue(mockQueryReturnValue);
    (useGetAgencyAdvantagesListQuery as jest.Mock).mockReturnValue(
        mockQueryReturnValue,
    );
    (useGetAgencyTimeFramesListQuery as jest.Mock).mockReturnValue(
        mockQueryReturnValue,
    );
    (useGetProjectGoalsListQuery as jest.Mock).mockReturnValue(
        mockQueryReturnValue,
    );
    (useGetTemplateTypesQuery as jest.Mock).mockReturnValue(
        mockQueryReturnValue,
    );

    it('should return correct data based on listType', () => {
        const { result } = renderHook(() => useGetList('industries'));
        expect(result.current).toEqual(['dummy data']);
    });

    it('should return correct data based on companySize', () => {
        const { result } = renderHook(() => useGetList('companySize'));
        expect((result as any).current[0].label).toEqual('It’s just me');
    });
    it('should return correct data based on spendBudget', () => {
        const { result } = renderHook(() => useGetList('spendBudget'));
        expect((result as any).current[0].label).toEqual('Less than $5k');
    });
    it('should return correct data based on roleInCompany', () => {
        const { result } = renderHook(() => useGetList('roleInCompany'));
        expect((result as any).current[0].label).toEqual('Founder/Ceo');
    });
    it('should return correct data based on agencyTimeframes', () => {
        const { result } = renderHook(() => useGetList('agencyTimeframes'));
        expect((result as any).current[0].id).toEqual(undefined);
    });
    it('should return correct data based on kindsOfProjects', () => {
        const { result } = renderHook(() => useGetList('kindsOfProjects'));
        expect((result as any).current[0].name).toEqual('One-Time');
    });
    it('should return correct data based on projectPlanning', () => {
        const { result } = renderHook(() => useGetList('projectPlanning'));
        expect((result as any).current[0].name).toEqual('Social-First Content');
    });
    it('should return correct data based on projectGoals', () => {
        const { result } = renderHook(() => useGetList('projectGoals'));
        expect((result as any).current[0]).toEqual('dummy data');
    });
    it('should return correct data based on identities', () => {
        const { result } = renderHook(() => useGetList('identities'));
        expect((result as any).current[0]).toEqual('dummy data');
    });
    it('should return correct data based on paymentFrequency', () => {
        const { result } = renderHook(() => useGetList('paymentFrequency'));
        expect((result as any).current[0].label).toEqual('Monthly');
    });
    it('should return correct data based on listNumberOfEmployees', () => {
        const { result } = renderHook(() =>
            useGetList('listNumberOfEmployees'),
        );
        expect((result as any).current[0].label).toEqual('1');
    });
    it('should return correct data based on listBudget', () => {
        const { result } = renderHook(() => useGetList('listBudget'));
        expect((result as any).current[0].label).toEqual('$2,500 - $5,000');
    });
    it('should return correct data based on socialLinks', () => {
        const { result } = renderHook(() => useGetList('socialLinks'));
        expect((result as any).current[0].id).toEqual(undefined);
    });
    it('should return correct data based on templateTypes', () => {
        const { result } = renderHook(() => useGetList('templateTypes'));
        expect((result as any).current[0].id).toEqual(undefined);
    });
    it('should return correct data based on agenciesAdvantages', () => {
        const { result } = renderHook(() => useGetList('agenciesAdvantages'));
        expect((result as any).current[0].id).toEqual(undefined);
    });
    it('should return correct data based on numberOfPayments', () => {
        const { result } = renderHook(() => useGetList('numberOfPayments'));
        expect((result as any).current[0].label).toEqual('Ongoing');
    });
    it('should return correct data based on numberOfPaymentsWithoutOngoing', () => {
        const { result } = renderHook(() =>
            useGetList('numberOfPaymentsWithoutOngoing'),
        );
        expect((result as any).current[0].label).toEqual('2');
    });
    it('should return correct data based on paymentTerms', () => {
        const { result } = renderHook(() => useGetList('paymentTerms'));
        expect((result as any).current[0].label).toEqual(
            'Upon receipt (net 0)',
        );
    });
    it('should return correct data based on projectStartDay', () => {
        const { result } = renderHook(() => useGetList('projectStartDay'));
        expect((result as any).current[0].label).toEqual('Now');
    });
    it('should return correct data based on timeSlots', () => {
        const { result } = renderHook(() => useGetList('timeSlots'));
        expect((result as any).current[0].label).toEqual('12:00 am');
    });
    it('should return correct data based on groupedTimezones', () => {
        const { result } = renderHook(() => useGetList('groupedTimezones'));
        expect((result as any).current[0].label).toEqual(
            'Pacific Time - US & Canada',
        );
    });
    it('should return correct data based on listYearsInBusiness', () => {
        const { result } = renderHook(() => useGetList('listYearsInBusiness'));
        expect((result as any).current[0].label).toEqual('1-2');
    });
    it('should return correct data based on empty', () => {
        const { result } = renderHook(() => useGetList(''));
        expect((result as any).current).toEqual([]);
    });
});

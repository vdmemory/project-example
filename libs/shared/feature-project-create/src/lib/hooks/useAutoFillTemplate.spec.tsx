import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyGetTemplateQuery } from '@breef/shared/data-access-project-create';
import { MethodsProjectCreateType } from '../types/projectCreateTypes';
import { ProjectTemplateType } from '@breef/shared/types';
import { useAutoFillTemplate } from './useAutofillTempalte';

jest.mock('@breef/shared/data-access-project-create', () => ({
    useLazyGetTemplateQuery: jest.fn(),
}));

describe('useAutoFillTemplate', () => {
    const mockUseLazyGetTemplateQuery = useLazyGetTemplateQuery as jest.Mock;
    const mockGetTemplate = jest.fn();
    const methods: MethodsProjectCreateType = {
        projectScope: {
            setValue: jest.fn(),
            getValues: jest.fn().mockReturnValue({
                agencySkills: [],
            }),
        },
        agencyPreferences: {
            setValue: jest.fn(),
        },
        personalizeScope: {
            setValue: jest.fn(),
        },
        companyDetails: {
            setValue: jest.fn(),
        },
    } as unknown as MethodsProjectCreateType;

    const template: ProjectTemplateType = {
        description: 'Template description',
        agencySkills: [
            {
                id: 1,
                name: 'Skill 1',
                note: 'Template note 1',
                isCustomerNote: false,
            },
        ],
    };

    beforeEach(() => {
        mockUseLazyGetTemplateQuery.mockReturnValue([
            mockGetTemplate,
            { isFetching: false },
        ]);
        mockGetTemplate.mockReturnValue({
            unwrap: jest.fn().mockResolvedValue(template),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize correctly', () => {
        const { result } = renderHook(() => useAutoFillTemplate());

        expect(result.current.setTemplateMeta.id).toBeNull();
        expect(result.current.setTemplateMeta.isFetching).toBe(false);
    });

    it('should update form values with template data in setTemplateData', async () => {
        const currentSkills = [
            {
                id: 1,
                name: 'Skill 1',
                note: 'Current note 1',
                isCustomerNote: false,
            },
        ];
        const currentDescription = 'Current description';

        const { result } = renderHook(() => useAutoFillTemplate());

        await act(async () => {
            await result.current.setTemplateData(
                methods,
                currentSkills,
                currentDescription,
            );
        });

        expect(methods.projectScope.setValue).toHaveBeenCalledWith(
            'agencySkills',
            [
                {
                    id: 1,
                    name: 'Skill 1',
                    note: 'Template note 1',
                    isCustomerNote: false,
                },
            ],
        );
        expect(methods.personalizeScope.setValue).toHaveBeenCalledWith(
            'description',
            'Template description',
        );
    });

    it('should only update skill note if not customer note in setTemplateOnlySkill', async () => {
        const currentSkills = [
            {
                id: 1,
                name: 'Skill 1',
                note: 'Current note 1',
                isCustomerNote: false,
            },
            {
                id: 2,
                name: 'Skill 2',
                note: 'Current note 2',
                isCustomerNote: true,
            },
        ];
        (methods.projectScope.getValues as jest.Mock).mockReturnValue({
            agencySkills: currentSkills,
        });

        const { result } = renderHook(() => useAutoFillTemplate());

        await act(async () => {
            await result.current.setTemplateOnlySkill(
                methods,
                currentSkills,
                1,
            );
        });

        expect(methods.projectScope.setValue).toHaveBeenCalledWith(
            'agencySkills',
            [
                {
                    id: 1,
                    name: 'Skill 1',
                    note: 'Template note 1',
                    isCustomerNote: false,
                },
                {
                    id: 2,
                    name: 'Skill 2',
                    note: 'Current note 2',
                    isCustomerNote: true,
                },
            ],
        );
    });

    it('should not update skill note if it is customer note in setTemplateOnlySkill', async () => {
        const currentSkills = [
            {
                id: 1,
                name: 'Skill 1',
                note: 'Current note 1',
                isCustomerNote: true,
            },
        ];
        (methods.projectScope.getValues as jest.Mock).mockReturnValue({
            agencySkills: currentSkills,
        });

        const { result } = renderHook(() => useAutoFillTemplate());

        await act(async () => {
            await result.current.setTemplateOnlySkill(
                methods,
                currentSkills,
                1,
            );
        });

        expect(methods.projectScope.setValue).not.toHaveBeenCalled();
    });
});

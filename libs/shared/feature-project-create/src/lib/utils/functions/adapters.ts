import {
    CompanyInfoMergedResponseType,
    ProjectByIdType,
} from '@breef/shared/types';
import { FormType } from '../../types/projectCreateTypes';

export const transformCompanyDetails = ({
    project,
    profile,
}: {
    project?: ProjectByIdType;
    profile?: CompanyInfoMergedResponseType;
}): FormType => {
    return {
        name: project?.companyName || profile?.companyName || '',
        website: project?.companyWebsite || profile?.website || '',
        location:
            project?.companyLocation || profile?.officeLocations[0]?.name || '',
        description:
            project?.companyDescription || profile?.companyOverview || '',
    };
};

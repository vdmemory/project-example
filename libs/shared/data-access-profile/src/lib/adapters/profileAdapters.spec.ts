import {
    BillingStructureType,
    CapabilityPricingRetainerType,
    CapabilityPricingType,
} from '@breef/shared/constants';
import {
    AccountInfoRequestType,
    AccountInfoResponseType,
    BillingDataMergedType,
    BillingDataRequestType,
    CapabilitiesRequestType,
    ChangePasswordRequestType,
    CompanyInfoRequestType,
    CompanyInfoResponseType,
    CompanyRequestType,
    IndustriesTagsRequestType,
    LinksDocsRequestType,
    ListRolesResponse,
    SetPasswordRequestType,
    TeamMembersProfileResponseType,
} from '@breef/shared/types';
import {
    excludeOwner,
    getSocialLink,
    prepareChangeAccountInfoData,
    prepareChangeBillingData,
    prepareChangeCapabilitiesData,
    prepareChangeCompanyData,
    prepareChangeCompanyInfoData,
    prepareChangeIndustriesTagsData,
    prepareChangeLinksDocsData,
    prepareChangePasswordData,
    prepareInviteTeamMemberData,
    prepareResendInviteTeamMemberData,
    prepareSetPasswordData,
    transformAccountInfoData,
    transformBillingData,
    transformCompanyInfoData,
    transformListRolesData,
    transformOfficeLocations,
    transformTeamMembersData,
} from './profileAdapters';

describe('prepareSetPasswordData', () => {
    it('should transform the input data correctly', () => {
        const mockValues: SetPasswordRequestType = {
            newPassword: 'newPassword123',
            confirmNewPassword: 'newPassword123',
        };

        const result = prepareSetPasswordData(mockValues);

        expect(result).toEqual({
            new_password: 'newPassword123',
            confirm_password: 'newPassword123',
        });
    });

    it('should handle empty input values', () => {
        const mockValues: SetPasswordRequestType = {
            newPassword: '',
            confirmNewPassword: '',
        };

        const result = prepareSetPasswordData(mockValues);

        expect(result).toEqual({
            new_password: '',
            confirm_password: '',
        });
    });
});

describe('prepareChangePasswordData', () => {
    it('should transform the input data correctly', () => {
        const mockValues: ChangePasswordRequestType = {
            currentPassword: 'oldPassword123',
            newPassword: 'newPassword123',
            confirmNewPassword: 'newPassword123',
        };

        const result = prepareChangePasswordData(mockValues);

        expect(result).toEqual({
            old_password: 'oldPassword123',
            new_password: 'newPassword123',
            confirm_password: 'newPassword123',
        });
    });

    it('should handle empty input values', () => {
        const mockValues: ChangePasswordRequestType = {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        };

        const result = prepareChangePasswordData(mockValues);

        expect(result).toEqual({
            old_password: '',
            new_password: '',
            confirm_password: '',
        });
    });
});

describe('prepareChangeAccountInfoData', () => {
    it('should transform the input data correctly', () => {
        const mockValues: AccountInfoRequestType = {
            firstName: ' John ',
            lastName: ' Doe ',
            email: 'Test@Example.com',
            phoneNumber: {
                number: '1234567890',
                code: '1',
                numberWithoutCountryCode: '+1',
            },
            companyType: 'agency',
            role: 'designer',
        };

        const result = prepareChangeAccountInfoData(mockValues);

        expect(result).toEqual({
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@example.com',
            phone_number: '1234567890',
        });
    });

    it('should handle empty input values', () => {
        const mockValues: AccountInfoRequestType = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: {
                number: '',
                code: '',
                numberWithoutCountryCode: '',
            },
            companyType: 'client',
            role: '',
        };

        const result = prepareChangeAccountInfoData(mockValues);

        expect(result).toEqual({
            first_name: '',
            last_name: '',
            email: '',
            phone_number: null,
        });
    });

    it('should trim whitespace from first and last names, email to lowercase', () => {
        const mockValues: AccountInfoRequestType = {
            firstName: '   Jane   ',
            lastName: '   Doe   ',
            email: 'JaneDoe@Example.com',
            phoneNumber: {
                number: '1234567890',
                code: '1',
                numberWithoutCountryCode: '+1',
            },
            companyType: 'agency',
            role: 'designer',
        };

        const result = prepareChangeAccountInfoData(mockValues);

        expect(result).toEqual({
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'janedoe@example.com',
            phone_number: '1234567890',
        });
    });
});

describe('transformAccountInfoData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should transform the input data correctly', () => {
        const mockValues: AccountInfoResponseType = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@example.com',
            email_to_confirm: 'confirm@example.com',
            has_password: true,
            phone_number: '1234567890',
            has_social_account: false,
            role: 'user',
        };

        const result = transformAccountInfoData(mockValues);

        expect(result).toEqual({
            firstName: 'John',
            lastName: 'Doe',
            email: 'test@example.com',
            emailToConfirm: 'confirm@example.com',
            hasPassword: true,
            phoneNumber: {
                number: '1234567890',
                numberWithoutCountryCode: '',
                code: '',
            },
            hasSocialAccount: false,
            role: 'user',
        });
    });
});

describe('prepareChangeCompanyInfoData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should prepare the data correctly', () => {
        const mockValues: CompanyInfoRequestType = {
            companyName: 'Test Company',
            companyOverview: 'This is a test company.',
            website: 'http://test.com',
            instagram: 'http://instagram.com/test',
            twitter: 'http://twitter.com/test',
            tiktok: 'http://tiktok.com/test',
            officeLocations: [
                { id: 1, name: 'New York' },
                { id: 2, name: 'San Francisco' },
            ],
            logo: 1,
            industries: [
                { id: 1, name: 'ind1' },
                { id: 2, name: 'ind2' },
            ],
            companySize: '10-50',
            companyType: 'client',
            logoUrl: 'logo.png',
        };

        const result = prepareChangeCompanyInfoData(mockValues);

        expect(result).toEqual({
            name: 'Test Company',
            description: 'This is a test company.',
            website: 'http://test.com',
            social_links: [
                { title: 'instagram', link: 'http://instagram.com/test' },
                { title: 'twitter', link: 'http://twitter.com/test' },
                { title: 'tiktok', link: 'http://tiktok.com/test' },
            ],
            office_locations: [
                { location: 'New York' },
                { location: 'San Francisco' },
            ],
            logo: 1,
            industries: [1, 2],
            company_size: '10-50',
        });
    });

    it('should trim company name and description', () => {
        const mockValues: CompanyInfoRequestType = {
            companyName: '  Trimmed Company  ',
            companyOverview: '  This is a trimmed company overview.  ',
            website: 'http://trimmed.com',
            instagram: '',
            twitter: '',
            tiktok: '',
            officeLocations: [{ id: 1, name: 'Boston' }],
            logo: null,
            industries: [],
            companySize: '5-10',
            companyType: 'client',
            logoUrl: 'trimmed-logo.png',
        };

        const result = prepareChangeCompanyInfoData(mockValues);

        expect(result).toEqual({
            name: 'Trimmed Company',
            description: 'This is a trimmed company overview.',
            website: 'http://trimmed.com',
            social_links: [],
            office_locations: [{ location: 'Boston' }],
            logo: null,
            industries: [],
            company_size: '5-10',
        });
    });
});

describe('prepareChangeCompanyData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should prepare the data correctly', () => {
        const mockValues: CompanyRequestType = {
            companyName: 'Test Company',
            companyOverview: 'This is a test company.',
            website: 'http://test.com',
            instagram: 'http://instagram.com/test',
            twitter: 'http://twitter.com/test',
            linkedin: 'http://linkedin.com/test',
            meta: 'http://meta.com/test',
            officeLocations: [{ id: 1, name: 'New York' }],
            teamSize: '50',
            yearsInBusiness: '10',
            tagline: 'We deliver excellence',
            contactEmail: 'contact@test.com',
            contactPhoneNumber: {
                number: '1234567890',
                numberWithoutCountryCode: '+1',
                code: '1',
            },
            logo: null,
            industries: [],
            companyType: 'client',
            logoUrl: 'trimmed-logo.png',
        };

        const result = prepareChangeCompanyData(mockValues);

        expect(result).toEqual({
            name: 'Test Company',
            description: 'This is a test company.',
            website: 'http://test.com',
            social_links: [
                { title: 'instagram', link: 'http://instagram.com/test' },
                { title: 'twitter', link: 'http://twitter.com/test' },
                { title: 'linkedin', link: 'http://linkedin.com/test' },
                { title: 'meta', link: 'http://meta.com/test' },
            ],
            office_locations: [{ location: 'New York' }],
            number_of_employees: '50',
            business_years: '10',
            catchline: 'We deliver excellence',
            primary_contact_email: 'contact@test.com',
            primary_contact_phone_number: '1234567890',
            logo: null,
        });
    });
});

describe('prepareChangeCapabilitiesData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should prepare the capabilities data correctly', () => {
        const mockValues: CapabilitiesRequestType = {
            services: [
                {
                    name: 'Service A',
                    serviceId: 1,
                    pricing: {
                        packageName: 'Basic Package',
                        description: 'Basic package description',
                        projectAmount: '1000',
                        minProjectAmount: '500',
                        maxProjectAmount: '2000',
                        pricingStructure: CapabilityPricingType.RANGE,
                        billingStructure: null,
                        retainerType: null,
                    },
                    portfolio: [
                        {
                            clientName: 'Client A',
                            clientWebsite: 'http://client-a.com',
                            projectName: 'Project A',
                            startDateYear: '2022',
                            startDateMonth: 'January',
                            projectDescription: 'Description of Project A',
                            clientTestimonial: 'Great job!',
                            linkUrl: 'http://project-a.com',
                            documents: [
                                {
                                    id: 1,
                                    title: 'Document 1',
                                    link: 'http://document-1.com',
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        const result = prepareChangeCapabilitiesData(mockValues);

        expect(result).toEqual({
            capabilities: [
                {
                    capability: 1,
                    pricing: [
                        {
                            name: 'Basic Package',
                            description: 'Basic package description',
                            minimum: 500,
                            maximum: 2000,
                            price_type: CapabilityPricingType.RANGE,
                            billing_structure: null,
                            retainer_type: null,
                        },
                    ],
                    clients: [
                        {
                            name: 'Client A',
                            website: 'http://client-a.com',
                            project_name: 'Project A',
                            project_date: 'January, 2022',
                            project_description: 'Description of Project A',
                            testimonial: 'Great job!',
                            links: [
                                {
                                    title: 'Service A for Client A',
                                    link: 'http://project-a.com',
                                },
                            ],
                            documents: [1],
                        },
                    ],
                },
            ],
        });
    });

    it('should correctly process pricing null', () => {
        const mockValues: CapabilitiesRequestType = {
            services: [
                {
                    name: 'Service A',
                    serviceId: 3,
                    pricing: null,
                    portfolio: [
                        {
                            clientName: 'Client A',
                            clientWebsite: 'http://client-a.com',
                            projectName: 'Project A',
                            startDateYear: '2022',
                            startDateMonth: 'January',
                            projectDescription: 'Description of Project A',
                            clientTestimonial: 'Great job!',
                            linkUrl: 'http://project-a.com',
                            documents: [
                                {
                                    id: 1,
                                    title: 'Document 1',
                                    link: 'http://document-1.com',
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        const result = prepareChangeCapabilitiesData(mockValues);

        expect(result).toEqual({
            capabilities: [
                {
                    capability: 3,
                    pricing: [],
                    clients: [
                        {
                            name: 'Client A',
                            project_date: 'January, 2022',
                            project_description: 'Description of Project A',
                            project_name: 'Project A',
                            testimonial: 'Great job!',
                            website: 'http://client-a.com',
                            links: [
                                {
                                    link: 'http://project-a.com',
                                    title: 'Service A for Client A',
                                },
                            ],
                            documents: [1],
                        },
                    ],
                },
            ],
        });
    });
});

describe('prepareChangeIndustriesTagsData', () => {
    it('should prepare the industries and tags data correctly', () => {
        const mockValues: IndustriesTagsRequestType = {
            industries: [
                { id: 1, name: 'Industry A' },
                { id: 2, name: 'Industry B' },
            ],
            tags: [
                { id: 10, name: 'Tag A' },
                { id: 20, name: 'Tag B' },
            ],
        };

        const result = prepareChangeIndustriesTagsData(mockValues);

        expect(result).toEqual({
            industries: [1, 2],
            tags: [10, 20],
        });
    });
});

describe('prepareChangeLinksDocsData', () => {
    it('should prepare the portfolio links and documents data correctly', () => {
        const mockValues: LinksDocsRequestType = {
            links: [
                {
                    id: 1,
                    link: 'http://example.com/portfolio1',
                    title: 'Portfolio 1',
                },
                {
                    id: 2,
                    link: 'http://example.com/portfolio2',
                    title: 'Portfolio 2',
                },
            ],
            docs: [{ id: 1, link: 'http://example.com/doc1', title: 'Doc 1' }],
        };

        const result = prepareChangeLinksDocsData(mockValues);

        expect(result).toEqual({
            portfolio_links: [
                {
                    link: 'http://example.com/portfolio1',
                    title: 'Portfolio 1',
                },
                {
                    link: 'http://example.com/portfolio2',
                    title: 'Portfolio 2',
                },
            ],
            documents: [1],
        });
    });
});

describe('getSocialLink', () => {
    it('should return the formatted link for a given title', () => {
        const socialLinks = [
            { link: 'http://example.com/instagram', title: 'instagram' },
            { link: 'http://example.com/twitter', title: 'twitter' },
        ];

        const result = getSocialLink(socialLinks, 'instagram');
        expect(result).toBe('http://example.com/instagram');
    });
});

describe('transformOfficeLocations', () => {
    it('should remove duplicate locations', () => {
        const locations = [
            { id: 1, location: 'New York' },
            { id: 2, location: 'New York' },
            { id: 3, location: 'Los Angeles' },
        ];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([
            { id: 1, name: 'New York' },
            { id: 3, name: 'Los Angeles' },
        ]);
    });

    it('should remove locations with "None" and "None, None"', () => {
        const locations = [
            { id: 1, location: 'None' },
            { id: 2, location: 'None, None' },
            { id: 3, location: 'San Francisco' },
        ];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([{ id: 3, name: 'San Francisco' }]);
    });

    it('should remove "None, " from locations like "None, Kiev"', () => {
        const locations = [
            { id: 1, location: 'None, Kiev' },
            { id: 2, location: 'Kiev' },
        ];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([
            { id: 1, name: 'Kiev' },
            { id: 2, name: 'Kiev' },
        ]);
    });

    it('should handle an empty array', () => {
        const locations: { id: number; location: string }[] = [];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([]);
    });

    it('should handle locations without any modifications needed', () => {
        const locations = [
            { id: 1, location: 'San Francisco' },
            { id: 2, location: 'Los Angeles' },
        ];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([
            { id: 1, name: 'San Francisco' },
            { id: 2, name: 'Los Angeles' },
        ]);
    });

    it('should correctly transform complex location data', () => {
        const locations = [
            { id: 1, location: 'New York' },
            { id: 2, location: 'None' },
            { id: 3, location: 'None, None' },
            { id: 4, location: 'None, Kiev' },
            { id: 5, location: 'San Francisco' },
            { id: 6, location: 'Los Angeles' },
            { id: 7, location: 'New York' },
            { id: 8, location: 'Kiev' },
        ];

        const result = transformOfficeLocations(locations);
        expect(result).toEqual([
            { id: 1, name: 'New York' },
            { id: 4, name: 'Kiev' },
            { id: 5, name: 'San Francisco' },
            { id: 6, name: 'Los Angeles' },
            { id: 8, name: 'Kiev' },
        ]);
    });
});

describe('prepareInviteTeamMemberData', () => {
    it('should prepare data for inviting a team member', () => {
        const values = {
            id: 1,
            email: 'test@example.com',
        };

        const result = prepareInviteTeamMemberData(values);
        expect(result).toEqual({
            email: 'test@example.com',
        });
    });
});

describe('prepareResendInviteTeamMemberData', () => {
    it('should prepare data for inviting a team member', () => {
        const values = {
            id: 1,
            email: 'test@example.com',
            resend: true,
        };

        const result = prepareResendInviteTeamMemberData(values);
        expect(result).toEqual({
            email: 'test@example.com',
            resend: true,
        });
    });
});

describe('transformTeamMembersData', () => {
    it('should transform team members data correctly', () => {
        const values: TeamMembersProfileResponseType = {
            team_members: [
                {
                    id: 1,
                    email: 'test1@example.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    position: 'Developer',
                    phone_number: '123-456-7890',
                },
            ],
            invites: [
                {
                    id: 3,
                    email: 'invite1@example.com',
                    invitation_status: 'Pending',
                    invitation_date: '2024-06-24',
                    phone_number: '555-555-5555',
                },
            ],
        };

        const result = transformTeamMembersData(values);
        expect(result).toEqual({
            teamMembers: [
                {
                    email: 'test1@example.com',
                    firstName: 'John',
                    id: 1,
                    lastName: 'Doe',
                    phoneNumber: '123-456-7890',
                    position: 'Developer',
                },
            ],
            invites: [
                {
                    email: 'invite1@example.com',
                    status: 'Pending',
                    date: '2024-06-24',
                    id: 3,
                    phoneNumber: '555-555-5555',
                },
            ],
        });
    });
});

describe('transformListRolesData', () => {
    it('should transform list of roles data correctly', () => {
        const values = [
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
            { id: '3', title: 'Employee' },
        ];

        const result = transformListRolesData(values);
        expect(result).toEqual([
            { value: '1', label: 'Admin' },
            { value: '2', label: 'Manager' },
            { value: '3', label: 'Employee' },
        ]);
    });

    it('should exclude owner role from transformation', () => {
        const values = [
            { id: '1', title: 'Owner' },
            { id: '2', title: 'Admin' },
            { id: '3', title: 'Manager' },
        ];

        const result = transformListRolesData(values);
        expect(result).toEqual([
            { value: '2', label: 'Admin' },
            { value: '3', label: 'Manager' },
        ]);
    });

    it('should handle empty list of roles', () => {
        const values: ListRolesResponse = [];

        const result = transformListRolesData(values);
        expect(result).toEqual([]);
    });
});

describe('excludeOwner', () => {
    it('should exclude roles with "Owner" in the title case-insensitively', () => {
        const roles = [
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
            { id: '3', title: 'Owner' },
        ];

        const result = excludeOwner(roles);
        expect(result).toEqual([
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
        ]);
    });

    it('should exclude roles with "owner" in the title case-insensitively', () => {
        const roles = [
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
            { id: '3', title: 'owner' },
        ];

        const result = excludeOwner(roles);
        expect(result).toEqual([
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
        ]);
    });

    it('should handle empty roles array', () => {
        const roles: ListRolesResponse = [];

        const result = excludeOwner(roles);
        expect(result).toEqual([]);
    });

    it('should handle roles with titles that do not contain "Owner" or "owner"', () => {
        const roles = [
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
            { id: '3', title: 'Supervisor' },
        ];

        const result = excludeOwner(roles);
        expect(result).toEqual([
            { id: '1', title: 'Admin' },
            { id: '2', title: 'Manager' },
            { id: '3', title: 'Supervisor' },
        ]);
    });
});

describe('transformBillingData', () => {
    it('should transform billing data with all fields present', () => {
        const values: BillingDataRequestType = {
            billing_details: {
                legal_name: 'Company ABC',
                billing_address: '123 Main St',
                address_additional_info: 'Suite 100',
            },
        };

        const result = transformBillingData(values);
        expect(result).toEqual({
            legalName: 'Company ABC',
            billingAddress: '123 Main St',
            billingAddressAdditional: 'Suite 100',
        });
    });

    it('should transform billing data with some fields missing', () => {
        const values: BillingDataRequestType = {
            billing_details: null,
        };

        const result = transformBillingData(values);
        expect(result).toEqual({
            billingAddress: '',
            billingAddressAdditional: '',
            legalName: '',
        });
    });
});

describe('transformBillingData, prepareChangeBillingData', () => {
    it('should transform billing data with all fields present', () => {
        const values: BillingDataRequestType = {
            billing_details: {
                legal_name: 'Company ABC',
                billing_address: '123 Main St',
                address_additional_info: 'Suite 100',
            },
        };

        const result = transformBillingData(values);
        expect(result).toEqual({
            legalName: 'Company ABC',
            billingAddress: '123 Main St',
            billingAddressAdditional: 'Suite 100',
        });
    });

    it('should prepare billing data with some fields missing', () => {
        const values: BillingDataMergedType = {
            legalName: 'Company ABC',
            billingAddress: '123 Main St',
            billingAddressAdditional: 'Suite 100',
        };

        const result = prepareChangeBillingData(values);
        expect(result).toEqual({
            billing_details: {
                legal_name: 'Company ABC',
                billing_address: '123 Main St',
                address_additional_info: 'Suite 100',
            },
        });
    });
});

describe('transformCompanyInfoData', () => {
    it('should transform company info data with all fields present', () => {
        const values: CompanyInfoResponseType = {
            name: 'Company ABC',
            description: 'Company overview',
            website: 'https://example.com',
            social_links: [
                { title: 'instagram', link: 'https://instagram.com/example' },
                { title: 'twitter', link: 'https://twitter.com/example' },
            ],
            office_locations: [
                { id: 1, location: 'New York' },
                { id: 2, location: 'Los Angeles' },
            ],
            brand_lead: {
                brand_lead: {
                    company_type: '',
                    help_text: 'Hi {user first name}! Chat me here',
                    id: 1,
                    logo_url: '',
                    calendly_link: '',
                },
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe@example.com',
            },
            number_of_employees: '100',
            business_years: '5',
            primary_contact_email: 'contact@example.com',
            primary_contact_phone_number: '+1234567890',
            catchline: 'Building dreams',
            industries: [{ id: 1, name: 'Industry 1' }],
            tags: [{ id: 1, name: 'Tag 1' }],
            portfolio_links: [
                { id: 1, link: 'https://portfolio.com', title: 'Portfolio' },
            ],
            documents: [
                {
                    id: 1,
                    name: 'Document 1',
                    url: 'https://document.com',
                    thumbnail_url: 'https://thumbnail.com',
                },
            ],
            company_size: 'Large',
            logo_url: 'https://logo.com',
            logo: 1,
            services_and_skills: [{ id: 1, name: 'Service 1' }],
            company_role: 'Company owner',
            capabilities: [
                {
                    name: 'Service 1',
                    capability: { id: 1, name: 'Service 1' },
                    pricing: [
                        {
                            name: 'Basic Package',
                            description: 'Basic package description',
                            minimum: 500,
                            maximum: 2000,
                            price_type: CapabilityPricingType.RANGE,
                            billing_structure: BillingStructureType.ONE_TIME,
                            retainer_type:
                                CapabilityPricingRetainerType.MONTHLY,
                        },
                    ],
                    clients: [
                        {
                            name: 'Client 1',
                            website: 'https://client1.com',
                            project_name: 'Project 1',
                            project_date: 'January, 2022',
                            project_description: 'Project description',
                            testimonial: 'Client testimonial',
                            links: [
                                { title: 'Link 1', link: 'https://link1.com' },
                            ],
                            documents: [
                                {
                                    id: 1,
                                    name: 'Doc 1',
                                    url: 'https://doc1.com',
                                    thumbnail_url: 'https://thumbnail.com',
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        const result = transformCompanyInfoData(values);
        expect(result).toEqual({
            companyRole: undefined,
            companyName: 'Company ABC',
            companyOverview: 'Company overview',
            website: 'https://example.com',
            instagram: 'https://instagram.com/example',
            twitter: 'https://twitter.com/example',
            meta: '',
            officeLocations: [
                { id: 1, name: 'New York' },
                { id: 2, name: 'Los Angeles' },
            ],
            brandLead: {
                brandLead: {
                    id: 1,
                    helpText: 'Hi {user first name}! Chat me here',
                    companyType: '',
                    logoUrl: '',
                    calendlyLink: '',
                },
                id: 1,
                email: 'john.doe@example.com',
                firstName: 'John',
                lastName: 'Doe',
            },
            teamSize: '100',
            yearsInBusiness: '5',
            contactEmail: 'contact@example.com',
            contactPhoneNumber: {
                code: '',
                number: '+1234567890',
                numberWithoutCountryCode: '',
            },
            tagline: 'Building dreams',
            industries: [{ id: 1, name: 'Industry 1' }],
            tags: [{ id: 1, name: 'Tag 1' }],
            links: [
                { id: 1, link: 'https://portfolio.com', title: 'Portfolio' },
            ],
            docs: [
                { id: 1, title: 'Document 1', link: 'https://document.com' },
            ],
            companySize: 'Large',
            logoUrl: 'https://logo.com',
            logo: 1,
            servicesAndSkills: [{ id: 1, name: 'Service 1' }],
            services: [
                {
                    serviceId: 1,
                    name: 'Service 1',
                    pricing: {
                        billingStructure: 'one_time',
                        description: 'Basic package description',
                        maxProjectAmount: '2000',
                        minProjectAmount: '500',
                        packageName: 'Basic Package',
                        pricingStructure: 'range',
                        projectAmount: '500',
                        retainerType: 'monthly',
                    },
                    portfolio: [
                        {
                            clientName: 'Client 1',
                            clientWebsite: 'https://client1.com',
                            projectName: 'Project 1',
                            startDateMonth: 'January',
                            startDateYear: '2022',
                            projectDescription: 'Project description',
                            clientTestimonial: 'Client testimonial',
                            linkUrl: 'https://link1.com',
                            documents: [
                                {
                                    id: 1,
                                    title: 'Doc 1',
                                    link: 'https://doc1.com',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});

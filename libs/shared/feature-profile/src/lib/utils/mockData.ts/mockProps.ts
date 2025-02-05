export const mockAccountInfoData = {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'example@gmail.com',
    phoneNumber: {
        number: '+380666666666',
        code: '+380',
        numberWithoutCountryCode: '666666666',
    },
    hasPassword: false,
    hasSocialAccount: false,
    role: 'owner',
};

export const mockCompanyInfoData = {
    companyName: 'Test Company',
    website: 'example.com',
    industries: [{ id: 1, name: 'industry 1' }],
    officeLocations: [{ id: 1, name: 'location 1' }],
    numberEmployees: '1-5',
    instagram: '@instagram',
    twitter: '@twitter',
    linkedin: '@linkedin',
    tiktok: '@tiktok',
    companyOverview: 'Test Company Overview',
    companySize: 'just_me',
    logo: 1,
    logoUrl: 'logo-url.com',
    brandLead: {
        brandLead: {
            companyType: 'client',
            helpText: 'Help Text',
            id: 1,
            logoUrl: 'logo-url.com',
            calendlyLink: 'calendly-link.com',
        },
        firstName: 'LeadFirst',
        lastName: 'LeadLast',
        email: 'example-lead@gmail.com',
        id: 1,
    },
    tags: [{ id: 1, name: 'tag 1' }],
    docs: [{ id: 1, title: 'doc 1', link: 'doc-url.com' }],
    links: [{ id: 1, title: 'link 1', link: 'link-url.com' }],
    services: [
        {
            serviceId: 1,
            name: 'service 1',
            pricing: null,
            portfolio: [
                {
                    clientName: 'Client Name',
                    clientWebsite: 'client-website.com',
                    projectName: 'Project Name',
                    startDateMonth: '1',
                    startDateYear: '2021',
                    projectDescription: 'Project Description',
                    clientTestimonial: 'Client Testimonial',
                    linkUrl: 'link-url.com',
                    documents: [{ id: 1, title: 'doc 1', link: 'doc-url.com' }],
                },
            ],
        },
    ],
};

export const mockBillingData = {
    legalName: 'Test Legal Name',
    billingAddress: 'Kyiv, UA',
    billingAddressAdditional: '6666666',
};

export const mockServiceData = [
    {
        id: 6,
        name: 'Brand Strategy / Refresh',
    },
    {
        id: 16,
        name: 'Affiliate Marketing',
    },
];

export const mockSkillsSelected = [
    {
        id: 1,
        name: 'test service',
        skills: [
            {
                id: 2,
                name: 'test skill',
            },
            {
                id: 3,
                name: 'test skill 2',
            },
        ],
    },
];

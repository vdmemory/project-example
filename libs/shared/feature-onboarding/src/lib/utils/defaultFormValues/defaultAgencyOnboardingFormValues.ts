const generalDefaultOnboardingFormValues = {
    website: '',
    officeLocations: [{ location: '' }],
    numberOfEmployees: '',
    industries: [],
    servicesAndSkills: [],
    identity: [],
    phoneNumber: '',
    isSmsSending: true,
};

export const defaultAgencyOnboardingFormValuesWithSocial = {
    ...generalDefaultOnboardingFormValues,
    companyName: '',
};
export const defaultAgencyOnboardingFormValues =
    generalDefaultOnboardingFormValues;

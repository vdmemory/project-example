import { handsBigImage } from '@breef/shared/assets';

const sharedConfigPopup = {
    headerImageUrl: handsBigImage.src,
    completeButtonLabel: 'BACK TO DASHBOARD',
};

export const clientConfigPopup = {
    label: "We'll be in Touch",
    note: "Agencies will now confirm their availability.\nYou'll then receive meeting invites.",
    ...sharedConfigPopup,
};
export const agencyConfigPopup = {
    label: 'Prepare for\nyour Client Call',
    note: 'Keep an eye out for a calendar invite for your\nupcoming client meeting. ',
    ...sharedConfigPopup,
};

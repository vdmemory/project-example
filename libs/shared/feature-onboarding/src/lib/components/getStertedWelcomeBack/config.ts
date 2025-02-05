export const descFirstScreenClient =
    'Our new platform is currently in beta.\n Consider this the next chapter for better\n projects, pitches + payments. ';
export const descFirstScreenAgency =
    'Introducing our new platform  — the easiest way\n to find (and pay) for agencies, just got easier.';

export const marketingConfig = {
    label: 'chat with us to...',
    list: [
        'Scope Your Next Project',
        'Budget Upcoming Projects',
        'Plan Your Marketing Roadmap',
    ],
};

export const getButtonTitle = (
    userType: string,
    screen: number,
    countScreen: number,
) => {
    if (userType === 'agency') return 'LEARN MORE';
    if (screen === 1) return 'LEARN MORE';
    if (screen === countScreen) return 'TAKE A LOOK';
    return 'NEXT';
};

export const screenTwo = {
    title: 'A peek AT OUR NEW features...',
};

export const screenThree = {
    title: 'Meet YOUR MARKETING\n STRATEGISTS',
    description: `we’ve been in your shoes - and are HERE to help!`,
};

export const screenFour = {
    title: 'what projects are on your mind in 2023?',
    description: '(Select a few, we’ll share resources!)',
};

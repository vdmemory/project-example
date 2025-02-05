import { transformTeamMembersData } from './teamMembersAdapter';

describe('transformTeamMembersData', () => {
    it('transformTeamMembersData should return the correct object', () => {
        const values = {
            invitations: [
                {
                    id: 12,
                    email: 'member1@gmail.com',
                    first_name: 'Jon',
                    last_name: 'Bim',
                    company_position: 'member',
                    phone_number: '+188888888',
                    invitation_date: '22.05.2023',
                    invitation_status: 'invite',
                },
                {
                    id: 124,
                    email: 'member2@gmail.com',
                    first_name: 'Den',
                    last_name: 'Brown',
                    company_position: 'member',
                    phone_number: '+189768888',
                    invitation_date: '25.05.2023',
                    invitation_status: 'pending',
                },
            ],
            invites: [
                {
                    email: 'invites@gmail.com',
                    id: 546,
                    invitation_status: 'pending',
                    invitation_date: '29.05.2023',
                    phone_number: '+198787655',
                    company_position: 'member',
                },
            ],
        };

        const result = transformTeamMembersData(values);

        expect(result).toEqual({
            teamMembers: [
                {
                    id: 12,
                    email: 'member1@gmail.com',
                    firstName: 'Jon',
                    lastName: 'Bim',
                    position: 'member',
                },
            ],
            invites: [
                {
                    email: 'member2@gmail.com',
                    date: '25.05.2023',
                    id: 124,
                    phoneNumber: '+189768888',
                    status: 'pending',
                },
            ],
        });
    });
});

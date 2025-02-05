import React, { RefObject } from 'react';
import CustomDropdown from '../customDropdown/CustomDropdown';
import { ChangeHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import {
    transformListRolesData,
    useGetListRolesQuery,
} from '@breef/shared/data-access-profile';

export const StyledRoleView = styled.span`
    // padding-right: 40px;
    display: flex;
`;

export interface DropdownRoleProps {
    onChange: ChangeHandler;
    placeholder?: string;
    value: string;
    parentRef?: RefObject<HTMLElement>;
    actionsList?: { value: string; label: string }[];
    isAction?: boolean;
    onlyRemoveMember?: boolean;
}

export function DropdownRole({
    placeholder = '',
    onChange,
    value,
    parentRef,
    actionsList,
    isAction = true,
    onlyRemoveMember,
}: DropdownRoleProps) {
    const listRoles = useGetListRolesQuery();

    if (value.match(/owner/i)) {
        return <StyledRoleView>{value}</StyledRoleView>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRemoveTeam = (e: any) => {
        onChange({
            ...e,
            target: {
                value: 'remove',
            },
        });
    };

    return onlyRemoveMember ? (
        <span className="role-remove" onClick={e => handleRemoveTeam(e)}>
            Remove
        </span>
    ) : (
        <CustomDropdown
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            parentRef={parentRef}
            dropdownList={[
                ...transformListRolesData(listRoles.data || []),
                ...(actionsList || []),
            ]}
            isAction={isAction}
        />
    );
}

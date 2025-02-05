import React, { Fragment } from 'react';
import {
    StyledFilterItem,
    StyledFilterProjects,
} from '../FilterProjects.styled';
import { FilterProjectsType } from '@breef/shared/types';
import { Filters } from '@breef/shared/constants';
import { DividerIcon } from '@breef/shared/assets';

type Props = {
    filterProjects?: FilterProjectsType;
    activeProjectsCount: number;
    archivedProjectsCount: number;
    isFetchingProjects: boolean;
    changeFilterProjects?: (values: FilterProjectsType) => void;
};

const ClientFilter: React.FC<Props> = ({
    activeProjectsCount,
    archivedProjectsCount,
    isFetchingProjects,
    filterProjects,
    changeFilterProjects,
}) => {
    return (
        <StyledFilterProjects
            isAgency={false}
            data-testid="client-filter-projects"
        >
            {!!activeProjectsCount && (
                <StyledFilterItem
                    isClient
                    className="filter-label"
                    onClick={() =>
                        !isFetchingProjects &&
                        changeFilterProjects?.({
                            ...filterProjects,
                            status: Filters.active,
                        })
                    }
                    isActive={filterProjects?.status === Filters.active}
                    isHovered={true}
                    isSingleFilter={!archivedProjectsCount}
                >
                    My projects
                </StyledFilterItem>
            )}
            {!!archivedProjectsCount && (
                <Fragment>
                    {!!activeProjectsCount && (
                        <DividerIcon className="divider" />
                    )}

                    <StyledFilterItem
                        isClient
                        className="filter-label"
                        onClick={() =>
                            !isFetchingProjects &&
                            changeFilterProjects?.({
                                ...filterProjects,
                                status: Filters.archived,
                            })
                        }
                        isActive={filterProjects?.status === Filters.archived}
                        isHovered={!!archivedProjectsCount}
                    >
                        Archive
                    </StyledFilterItem>
                </Fragment>
            )}
        </StyledFilterProjects>
    );
};
export default ClientFilter;

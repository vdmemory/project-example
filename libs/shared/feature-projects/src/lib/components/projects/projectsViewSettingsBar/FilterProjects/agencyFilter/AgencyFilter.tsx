import { FilterProjectsType } from '@breef/shared/types';
import React from 'react';
import {
    StyledFilterItem,
    StyledFilterProjects,
} from '../FilterProjects.styled';
import { Filters } from '@breef/shared/constants';

type Props = {
    filterProjects?: FilterProjectsType;
    activeProjectsCount: number;
    archivedProjectsCount: number;
    isFetchingProjects: boolean;
    inProgressProjectsCount: number;
    newProjectsCount: number;
    submittedProjectsCount: number;
    changeFilterProjects?: (values: FilterProjectsType) => void;
};
const AgencyFilter: React.FC<Props> = ({
    activeProjectsCount,
    archivedProjectsCount,
    isFetchingProjects,
    filterProjects,
    inProgressProjectsCount,
    newProjectsCount,
    submittedProjectsCount,
    changeFilterProjects,
}) => {
    return (
        <StyledFilterProjects
            isAgency={true}
            data-testid="agency-filter-projects"
        >
            <div className="filter-projects-left-section">
                <StyledFilterItem
                    className="filter-label"
                    onClick={() =>
                        !isFetchingProjects &&
                        !!newProjectsCount &&
                        changeFilterProjects?.({
                            ...filterProjects,
                            status: Filters.new_projects,
                        })
                    }
                    isActive={filterProjects?.status === Filters.new_projects}
                    isHovered={!!newProjectsCount}
                >
                    New projects ({newProjectsCount})
                </StyledFilterItem>
                <StyledFilterItem
                    className="filter-label"
                    onClick={() =>
                        !isFetchingProjects &&
                        !!submittedProjectsCount &&
                        changeFilterProjects?.({
                            ...filterProjects,
                            status: Filters.submitted,
                        })
                    }
                    isActive={filterProjects?.status === Filters.submitted}
                    isHovered={!!submittedProjectsCount}
                >
                    submitted ({submittedProjectsCount})
                </StyledFilterItem>
                <StyledFilterItem
                    className="filter-label"
                    onClick={() =>
                        !isFetchingProjects &&
                        !!inProgressProjectsCount &&
                        changeFilterProjects?.({
                            ...filterProjects,
                            status: Filters.in_progress,
                        })
                    }
                    isActive={filterProjects?.status === Filters.in_progress}
                    isHovered={!!inProgressProjectsCount}
                >
                    in progress ({inProgressProjectsCount})
                </StyledFilterItem>
            </div>

            {!!archivedProjectsCount && (
                <StyledFilterItem
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
                    archive
                </StyledFilterItem>
            )}
        </StyledFilterProjects>
    );
};
export default AgencyFilter;

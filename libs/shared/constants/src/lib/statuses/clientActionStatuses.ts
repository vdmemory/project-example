export enum ProjectClientActionStatuses {
    postProject = 'post_project',
    reviewScope = 'review_scope',
    reviewPitches = 'review_pitches',
    completeReview = 'complete_review',
    shortlistAgencies = 'shortlist_agencies',
    setAvailability = 'set_availability',
    updateAvailability = 'update_availability',
    selectAgency = 'select_agency',
    awaitingKickoff = 'awaiting_kickoff',
    completeKickoff = 'complete_kickoff',
    viewProject = 'view_project',
    submitPayment = 'submit_payment',
    completed = 'completed',
    other = 'other_articles',
}

export enum DashboardClientActionStatuses {
    noProjects = 'no_projects',
}

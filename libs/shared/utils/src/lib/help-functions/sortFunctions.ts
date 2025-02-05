import { Deliverables, PitchesEstimations } from '@breef/shared/types';

export function sortDeliverablesById(deliverables: Deliverables[]) {
    return deliverables.sort(
        (a, b) =>
            (a.id ?? Number.MAX_SAFE_INTEGER) -
            (b.id ?? Number.MAX_SAFE_INTEGER),
    );
}

export function sortEstimationsById(estimation: PitchesEstimations[]) {
    return estimation.sort((a, b) => a.deliverable.id - b.deliverable.id);
}

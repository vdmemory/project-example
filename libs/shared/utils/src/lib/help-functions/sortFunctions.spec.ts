import { sortDeliverablesById, sortEstimationsById } from './sortFunctions';

describe('sortDeliverablesById', () => {
    it('sorts deliverables by ID in ascending order', () => {
        const deliverables = [
            { id: 3, title: 'Deliverable C', details: 'Details C' },
            { id: 1, title: 'Deliverable A', details: 'Details A' },
            { id: 2, title: 'Deliverable B', details: 'Details B' },
        ];

        const sortedDeliverables = sortDeliverablesById(deliverables);

        expect(sortedDeliverables).toEqual([
            { id: 1, title: 'Deliverable A', details: 'Details A' },
            { id: 2, title: 'Deliverable B', details: 'Details B' },
            { id: 3, title: 'Deliverable C', details: 'Details C' },
        ]);
    });

    it('handles null or undefined IDs by placing them at the end', () => {
        const deliverables = [
            { id: 3, title: 'Deliverable C', details: 'Details C' },
            { id: null, title: 'Deliverable Null', details: 'Details Null' },
            {
                id: undefined,
                title: 'Deliverable Undefined',
                details: 'Details Undefined',
            },
            { id: 1, title: 'Deliverable A', details: 'Details A' },
        ];

        const sortedDeliverables = sortDeliverablesById(deliverables);

        expect(sortedDeliverables).toEqual([
            { id: 1, title: 'Deliverable A', details: 'Details A' },
            { id: 3, title: 'Deliverable C', details: 'Details C' },
            { id: null, title: 'Deliverable Null', details: 'Details Null' },
            {
                id: undefined,
                title: 'Deliverable Undefined',
                details: 'Details Undefined',
            },
        ]);
    });
});

describe('sortEstimationsById', () => {
    it('sorts estimations by deliverable ID in ascending order', () => {
        const estimations = [
            {
                deliverable: {
                    id: 1,
                    title: 'Deliverable A',
                    details: 'Details A',
                },
                estimation: 100,
            },
            {
                deliverable: {
                    id: 3,
                    title: 'Deliverable C',
                    details: 'Details C',
                },
                estimation: 300,
            },
            {
                deliverable: {
                    id: 2,
                    title: 'Deliverable B',
                    details: 'Details B',
                },
                estimation: 200,
            },
        ];

        const sortedEstimations = sortEstimationsById(estimations);

        expect(sortedEstimations).toEqual([
            {
                deliverable: {
                    id: 1,
                    title: 'Deliverable A',
                    details: 'Details A',
                },
                estimation: 100,
            },
            {
                deliverable: {
                    id: 2,
                    title: 'Deliverable B',
                    details: 'Details B',
                },
                estimation: 200,
            },
            {
                deliverable: {
                    id: 3,
                    title: 'Deliverable C',
                    details: 'Details C',
                },
                estimation: 300,
            },
        ]);
    });
});

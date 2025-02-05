import ServicesSelect from './servicesSelect/ServicesSelect';

interface MultiCardSelectsControllerProps {
    value: { id: number; name: string }[];
    onChange: (value: { id: number | string; name: string }[]) => void;
    type: string;
}

export const MultiCardSelectsController = (
    props: MultiCardSelectsControllerProps,
) => {
    switch (props.type) {
        case multiCardSelects.services:
            return <ServicesSelect {...props} />;
        default:
            return <div data-testid="select-plug" />;
    }
};

export default MultiCardSelectsController;

export const multiCardSelects = {
    services: 'services',
};

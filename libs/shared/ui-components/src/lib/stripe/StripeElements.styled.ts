import { colors } from '@breef/ui-kit';
import { Appearance } from '@stripe/stripe-js';

const baseVariables = {
    colorPrimary: colors.primary.primary500,
    colorBackground: colors.white,
    colorText: colors.grey.grey900,
    colorDanger: colors.error.error500,
    fontFamily: 'Neue Haas Grotesk Display Pro',
    fontWeightNormal: '500',
    borderRadius: '0',
    fontSizeBase: '17px',
};

const primaryVariables = {
    ...baseVariables,
    borderRadius: '4px',
    spacingGridRow: '20px',
    spacingGridColumn: '20px',
};

const secondaryVariables = {
    ...baseVariables,
};

const getVariables = (variant?: 'primary' | 'secondary') => {
    switch (variant) {
        case 'primary':
            return primaryVariables;
        case 'secondary':
            return secondaryVariables;
        default:
            return baseVariables;
    }
};

const baseLabelRules = {
    fontSize: '16px',
};
const primaryLabelRules = {
    ...baseLabelRules,
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '10px',
    marginBottom: '12px',
};

const secondaryLabelRules = {
    ...baseLabelRules,
};

const getLabelRules = (redesignVariant?: 'primary' | 'secondary') => {
    switch (redesignVariant) {
        case 'primary':
            return primaryLabelRules;
        case 'secondary':
            return secondaryLabelRules;
        default:
            return baseLabelRules;
    }
};

const baseInputRules = {
    boxShadow: 'none',
    borderColor: colors.grey.grey900,
    padding: '14px 12px',
    color: colors.grey.grey900,
};

const primaryInputRules = {
    ...baseInputRules,
    padding: '15px 12px',
    fontSize: '14px',
    lineHeight: '16px',
    borderRadius: '0',
    borderColor: '#d8dcde',
};

const secondaryInputRules = {
    ...baseInputRules,
};

const getInputRules = (redesignVariant?: 'primary' | 'secondary') => {
    switch (redesignVariant) {
        case 'primary':
            return primaryInputRules;
        case 'secondary':
            return secondaryInputRules;
        default:
            return baseInputRules;
    }
};

const getInputPlaceholderRules = (
    redesignVariant?: 'primary' | 'secondary',
) => {
    switch (redesignVariant) {
        case 'primary':
            return {
                color: '#C2C8CC',
            };
        case 'secondary':
            return {
                color: colors.grey.grey500,
            };
        default:
            return {
                color: colors.grey.grey500,
            };
    }
};

export const getAppearance: (
    redesignVariant?: 'primary' | 'secondary',
) => Appearance = redesignVariant => ({
    theme: 'stripe',

    variables: getVariables(redesignVariant),

    rules: {
        '.Label': getLabelRules(redesignVariant),
        '.Input': getInputRules(redesignVariant),
        '.Input::placeholder': getInputPlaceholderRules(redesignVariant),
        '.Input--invalid': {
            boxShadow: 'none',
            color: colors.error.error500,
        },
        '.Error': {
            fontSize: '12px',
            color: colors.error.error500,
        },
    },
});

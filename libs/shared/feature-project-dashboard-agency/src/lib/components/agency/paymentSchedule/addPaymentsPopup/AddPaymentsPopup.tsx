import {
    Button,
    defaultRetainerPaymentValue,
    HeaderReview,
    InnerContractsWrapper,
    InnerFieldsBox,
    LinkButton,
    MilestonePayments,
    RetainerPayments,
    withPopup,
} from '@breef/shared/ui-components';
import React, { useContext, useEffect } from 'react';
import {
    StyledAddPaymentsPopup,
    StyledSection,
} from './AddPaymentsPopup.styled';
import {
    FormProvider,
    SubmitHandler,
    useController,
    useFieldArray,
    useForm,
    useWatch,
} from 'react-hook-form';
import { addPaymentsSchema } from '../../../../utils/validationForms/addPaymentsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    calculateSummaryMilestones,
    checkFirstMilestoneAmount,
    checkFirstMilestoneMonth,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { useAddPaymentsMutation } from '@breef/shared/data-access-payments';
import { toast } from 'react-toastify';
import { CloseIcon } from '@breef/shared/assets';
import {
    AddPaymentsType,
    StoredRetainerPaymentType,
    ControlTypePaymentsForm,
} from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';

type AddPaymentsPopupProps = {
    projectId: string | number;
    existRetainerPayment?: StoredRetainerPaymentType;
    isOngoingRetainerExist?: boolean;
    isDefaultOpenOngoingBlock?: boolean;
    close: () => void;
};

const AddPaymentsPopup: React.FC<AddPaymentsPopupProps> = ({
    projectId,
    existRetainerPayment,
    isOngoingRetainerExist = false,
    isDefaultOpenOngoingBlock = false,
    close,
}) => {
    const { isMobile } = useMediaContext();
    const [sendAddPayments, { isLoading, isSuccess, error }] =
        useAddPaymentsMutation();
    const methods = useForm<ControlTypePaymentsForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            paymentsMilestone: [],
            paymentsRetainer: null,
            files: [],
        },
        resolver: yupResolver(addPaymentsSchema),
    });
    const fieldArrayMilestones = useFieldArray({
        control: methods.control,
        name: 'paymentsMilestone',
    });
    const retainerPayments = useWatch({
        control: methods.control,
        name: 'paymentsRetainer',
    });
    const fieldFiles = useController({
        control: methods.control,
        name: 'files',
    });

    const watchAddPaymentsForm = useWatch({
        control: methods.control,
    });

    useEffect(() => {
        isDefaultOpenOngoingBlock &&
            methods.setValue(
                'paymentsRetainer',
                existRetainerPayment
                    ? {
                          ...existRetainerPayment,
                          numberOfPayments: '',
                      }
                    : {
                          ...defaultRetainerPaymentValue,
                      },
            );
    }, [isDefaultOpenOngoingBlock]);

    useEffect(() => {
        if (isSuccess) {
            const message = 'Payments added successfully!';
            toast.success(message, { toastId: message });
            close();
        }
        //eslint-disable-next-line
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            const message = validationErrorMessages[
                ValidationErrorType.default
            ] as string;
            toast.error(message, { toastId: message });
        }
    }, [error]);

    useEffect(() => {
        const summaryMilestones = calculateSummaryMilestones(
            (watchAddPaymentsForm as AddPaymentsType).paymentsMilestone,
        );
        methods.trigger().then(() => {
            if (
                !checkFirstMilestoneMonth(
                    (watchAddPaymentsForm as AddPaymentsType).paymentsMilestone,
                )
            ) {
                const message =
                    'The initial milestone installments must have the earliest invoice date.';
                methods.setError('paymentsMilestone.0.invoiceDate', {
                    type: 'important',
                    message: message,
                });
                toast.error(message, { toastId: message });
            }
            if (
                !checkFirstMilestoneAmount(
                    (watchAddPaymentsForm as AddPaymentsType).paymentsMilestone,
                    summaryMilestones,
                )
            ) {
                const message =
                    'Initial milestone installments must account for at least 25% of total milestone value';
                methods.setError('paymentsMilestone.0.amount', {
                    type: 'important',
                    message: message,
                });
                toast.error(message, { toastId: message });
            }
        });
        //eslint-disable-next-line
    }, [watchAddPaymentsForm]);

    const onSubmit: SubmitHandler<ControlTypePaymentsForm> = data => {
        sendAddPayments({
            ...(data as AddPaymentsType),
            projectId: projectId,
            isAlreadyExistsRetainers: !!existRetainerPayment?.numberOfPayments,
        });
    };

    return (
        <StyledAddPaymentsPopup>
            <FormProvider {...methods}>
                <div className="modal-header">Add payments</div>
                <div className="modal-body">
                    <StyledSection>
                        <MilestonePayments
                            fieldMethods={fieldArrayMilestones}
                            isCheckConfirmToDelete={false}
                            isAbilityToDeleteLastOne
                        />
                    </StyledSection>
                    <StyledSection
                        bottomSpace={retainerPayments !== null ? 50 : 0}
                    >
                        <RetainerPayments
                            title="Ongoing"
                            paymentsRetainerValue={retainerPayments}
                            numberOfExistPayments={
                                existRetainerPayment?.numberOfPayments
                            }
                            isShowActionButton
                            isHideOnNullValue
                            deleteTitle={<CloseIcon className="close-icon" />}
                            isOngoingRetainerExist={isOngoingRetainerExist}
                        />
                        {!retainerPayments && (
                            <LinkButton
                                className="add-payment-button"
                                name="Update retainer scope"
                                onClick={() =>
                                    methods.setValue(
                                        'paymentsRetainer',
                                        existRetainerPayment
                                            ? {
                                                  ...existRetainerPayment,
                                                  numberOfPayments: '',
                                              }
                                            : {
                                                  ...defaultRetainerPaymentValue,
                                              },
                                    )
                                }
                                icon="plus"
                                size="big"
                            />
                        )}
                    </StyledSection>
                    <StyledSection bottomSpace={!isMobile ? 100 : 40}>
                        <HeaderReview title="Contract amendment" />
                        <InnerFieldsBox>
                            <InnerContractsWrapper
                                value={fieldFiles.field.value}
                                onChange={fieldFiles.field.onChange}
                                labelMain="Signed documents (optional)"
                                labelAdditional=""
                                maxCount={1}
                            />
                        </InnerFieldsBox>
                    </StyledSection>
                </div>
                <Button
                    className="normal"
                    type="button"
                    arrowRight
                    disabled={!methods.formState.isValid || isLoading}
                    onClick={methods.handleSubmit(onSubmit)}
                    withAnimate
                >
                    Update
                </Button>
            </FormProvider>
        </StyledAddPaymentsPopup>
    );
};
export default withPopup(AddPaymentsPopup, { height: '100%' });

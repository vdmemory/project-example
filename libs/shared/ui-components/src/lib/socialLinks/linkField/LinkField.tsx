import { CloseIcon } from '@breef/shared/assets';
import { getProfileNameDisplay } from '@breef/shared/utils';
import { RefObject, useEffect, useRef } from 'react';
import { ChangeHandler } from 'react-hook-form';
import SocialLinksPopup from '../../popup/defaultPopup/socialLinksPopup/SocialLinksPopup';
import { StyledLinkField } from './LinkField.styled';
import { usePopup } from '../../popup/usePopup';
import { useMediaContext } from '@breef/shared/hooks';

interface LinkFieldProps {
    className?: string;
    onChange: ChangeHandler;
    value: string;
    label: string;
    maxLength?: number;
    parentRef?: RefObject<HTMLElement>;
}

export const LinkField = ({
    className,
    onChange,
    value,
    label,
    maxLength,
    parentRef,
}: LinkFieldProps) => {
    const socialLinksPopup = usePopup();
    const deleteRef = useRef<HTMLDivElement | null>(null);
    const { isMobile } = useMediaContext();

    const handleChange = ({ title, link }: { title: string; link: string }) => {
        onChange({
            target: { value: link },
        });
    };

    const handleDelete = () => {
        onChange({
            target: { value: '' },
        });
    };

    const onHoverLabel = () => {
        const label = parentRef ? parentRef.current : null;
        const linkDelete = deleteRef ? deleteRef.current : null;
        linkDelete &&
            linkDelete.setAttribute('class', 'link-delete link-delete-active');
        label && label.style?.setProperty('background', '#FAFAF9');
    };

    const onHoverOutLabel = () => {
        const label = parentRef ? parentRef.current : null;
        const linkDelete = deleteRef ? deleteRef.current : null;
        linkDelete && linkDelete.setAttribute('class', 'link-delete');
        label && label.style?.setProperty('background', '#FFFFFF');
    };

    useEffect(() => {
        if (parentRef?.current) {
            parentRef.current.onmouseover = () => onHoverLabel();
            parentRef.current.onmouseout = () => onHoverOutLabel();

            parentRef.current.onclick = e => {
                return e.target === deleteRef.current ||
                    deleteRef.current?.contains(e.target as Node)
                    ? null
                    : socialLinksPopup.open();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentRef]);

    return (
        <>
            <StyledLinkField
                className={className ? `${className} link-field` : 'link-field'}
            >
                {getProfileNameDisplay(value)}
                {value && (
                    <div
                        data-testid="delete-icon-wrapper"
                        ref={deleteRef}
                        className="link-delete"
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <CloseIcon />
                    </div>
                )}
            </StyledLinkField>
            {socialLinksPopup.isOpen && (
                <SocialLinksPopup
                    title={label}
                    url={value}
                    isEdit={false}
                    handleAddLink={handleChange}
                    isNotEditTitle
                    maxLengthLink={maxLength}
                    close={socialLinksPopup.close}
                    style={{
                        overflow: 'hidden',
                        minWidth: `${isMobile ? 'auto' : '37rem'}`,
                    }}
                />
            )}
        </>
    );
};

export default LinkField;

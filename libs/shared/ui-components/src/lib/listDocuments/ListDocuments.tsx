import { CloseIcon } from '@breef/shared/assets';
import { getBrandDocumentIcon } from '@breef/shared/utils';
import Spinner from '../spinner/Spinner';
import { StyledItemList, StyledListDocuments } from './ListDocuments.styled';
import { ListType } from '@breef/shared/types';

interface ListDocumentsProps {
    initList: ListType[];
    onChange: (id: number, type: string, action: string) => void;
    className?: string;
    outsideLoading?: boolean;
}

export const ListDocuments = ({
    initList,
    onChange,
    className,
    outsideLoading = false,
}: ListDocumentsProps) => {
    return (
        <StyledListDocuments className={className ? className : ''}>
            {initList.map((item, index) => (
                <ListItem
                    key={index}
                    {...item}
                    onChange={onChange}
                    outsideLoading={outsideLoading}
                />
            ))}
        </StyledListDocuments>
    );
};
export default ListDocuments;

interface ListItemProps {
    id: number;
    title: string;
    link: string;
    type?: string;
    loading?: boolean;
    onChange: (id: number, type: string, action: string) => void;
    outsideLoading?: boolean;
}

export const ListItem = ({
    id,
    title,
    link,
    type = 'link',
    loading = false,
    onChange,
    outsideLoading,
}: ListItemProps) => {
    return (
        <StyledItemList
            data-testid="list-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
                onChange &&
                !loading &&
                !outsideLoading &&
                onChange(Number(id), type, 'edit')
            }
        >
            {loading && <Spinner className="list-spinner" />}
            {type === 'file' && getBrandDocumentIcon(title)}
            <a
                onClick={e => e.stopPropagation()}
                target="_blank"
                href={link}
                rel="noreferrer"
            >
                {title}
            </a>
            {!loading && !outsideLoading && (
                <button
                    data-testid="close-button"
                    type="button"
                    className="close-button"
                    onClick={e => {
                        e.stopPropagation();
                        onChange && onChange(Number(id), type, 'delete');
                    }}
                    disabled={loading || outsideLoading}
                >
                    <CloseIcon
                        data-testid="close-icon"
                        className="close-icon"
                    />
                </button>
            )}
        </StyledItemList>
    );
};

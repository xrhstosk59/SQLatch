import { memo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface GuidePaginationProps {
    currentIndex: number;
    totalPages: number;
    onHomeClick: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
    onPageClick: (index: number) => void;
}

function GuidePagination({
    currentIndex,
    totalPages,
    onHomeClick,
    onPrevClick,
    onNextClick,
    onPageClick,
}: GuidePaginationProps) {
    const isPageActive = (id: number): boolean => {
        return id === currentIndex;
    };

    return (
        <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination.Item active={false} onClick={onHomeClick}>
                Αρχική
            </Pagination.Item>
            <Pagination.Prev onClick={onPrevClick} disabled={currentIndex === 0} />

            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index}
                    active={isPageActive(index)}
                    onClick={() => onPageClick(index)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={onNextClick} disabled={currentIndex === totalPages - 1} />
        </Pagination>
    );
}

export default memo(GuidePagination);

import { memo } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface GuidePaginationProps {
    currentIndex: number;
    totalPages: number;
    onHomeClick: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
    onPageClick: (index: number) => void;
    viewed?: boolean[];
}

function GuidePagination({
    currentIndex,
    totalPages,
    onHomeClick,
    onPrevClick,
    onNextClick,
    onPageClick,
    viewed = [],
}: GuidePaginationProps) {
    const isPageActive = (id: number): boolean => {
        return id === currentIndex;
    };

    return (
        <Pagination
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
                flexWrap: 'wrap',
                gap: '5px'
            }}
        >
            <Pagination.Item
                onClick={onHomeClick}
                style={{
                    fontWeight: 'bold',
                    backgroundColor: '#0d6efd',
                    borderColor: '#0d6efd',
                    color: 'white'
                }}
            >
                Αρχική
            </Pagination.Item>
            <Pagination.Prev onClick={onPrevClick} disabled={currentIndex === 0} />

            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index}
                    active={isPageActive(index)}
                    onClick={() => onPageClick(index)}
                >
                    {viewed[index] && <i className="bi bi-check-lg" style={{ color: '#14A44D' }}></i>}
                    {index + 1}
                </Pagination.Item>
            ))}

            <Pagination.Next onClick={onNextClick} disabled={currentIndex === totalPages - 1} />
        </Pagination>
    );
}

export default memo(GuidePagination);

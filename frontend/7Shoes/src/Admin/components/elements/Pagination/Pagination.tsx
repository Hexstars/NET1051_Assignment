interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button 
                            className="page-link" 
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            Trước
                        </button>
                    </li>
                )}

                {[...Array(totalPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
                        <button 
                            className="page-link" 
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}

                {currentPage < totalPages && (
                    <li className="page-item">
                        <button 
                            className="page-link" 
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Sau
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;

import React from "react";

interface PaginatorProps {
    setDecrementPage: () => void;
    setIncrementPage: () => void;
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    color?: string; // opcional
}

export const Paginator: React.FC<PaginatorProps> = ({
    setDecrementPage,
    setIncrementPage,
    itemsPerPage,
    currentPage,
    totalItems,
    color,
}) => {
    const total = Math.ceil(totalItems / itemsPerPage);

    const prevStyle = `
    flex items-center justify-center px-3 h-10 text-sm font-medium text-white
    bg-${color ? color : "primary"} border-0 border-e border-white rounded-s
    active:hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50
  `;

    const nextStyle = `
    flex items-center justify-center px-3 h-10 text-sm font-medium text-white
    bg-${color ? color : "primary"} border-0 border-s border-white rounded-e
    active:hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50
  `;

    return (
        <div className="inline-flex mt-2 xs:mt-0">
            <button
                onClick={setDecrementPage}
                className={prevStyle}
                disabled={currentPage <= 1}
            >
                <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                </svg>
                Ant.
            </button>

            <button
                disabled
                className={`flex items-center justify-center px-3 h-10 text-sm font-medium text-white bg-${color ? color : "primary"} px-6`}
            >
                {currentPage} de {total}
            </button>

            <button
                onClick={setIncrementPage}
                className={nextStyle}
                disabled={currentPage >= total}
            >
                Sig.
                <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </button>
        </div>
    )
}
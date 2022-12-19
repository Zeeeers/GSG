// Dependencies
import { useCallback, useEffect, useState } from 'react';
import { Box, Text, IconButton, Icon, BoxProps } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// Types
export interface IPaginationProps {
    paginationProps?: BoxProps;
    pages: number;
    actualPage: number;
    disabled?: boolean;
    onChange: (page: number) => any;
}

export interface IPagination extends IPaginationProps {
    pages: number;
    firstPage?: IPaginationButton;
    firstDots?: IPaginationButton;
    firstThree?: IPaginationButton;
    secondThree?: IPaginationButton;
    thirdThree?: IPaginationButton;
    lastDots?: IPaginationButton;
    lastPage?: IPaginationButton;
}

export interface IPaginationButton {
    isDisabled: boolean;
    shouldRender: boolean;
    number: number;
    label: string;
    isActive: boolean;
}

// Component
const Pagination: React.FC<IPaginationProps> = ({ actualPage, pages, onChange, paginationProps }) => {
    const [paginate, setPaginate] = useState<IPagination>({
        actualPage,
        onChange,
        pages,
    });

    // Handlers
    const getFirstPage = (page: number): IPaginationButton => {
        return {
            isDisabled: false,
            label: '1',
            number: 1,
            shouldRender: true,
            isActive: page === 1,
        };
    };

    const getFirstDots = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label: paginate.pages > 7 && page >= 5 ? '...' : '2',
                number:
                    paginate.pages > 7 && page >= 5 ? (page >= paginate.pages - 3 ? paginate.pages - 5 : page - 2) : 2,
                shouldRender: paginate.pages >= 2,
                isActive: page === 2,
            };
        },
        [paginate.pages],
    );

    const getFirstThree = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label:
                    paginate.pages > 7 && page >= 5
                        ? page < paginate.pages - 2
                            ? `${page - 1}`
                            : `${paginate.pages - 4}`
                        : '3',
                number:
                    paginate.pages > 7 && page >= 5 ? (page < paginate.pages - 2 ? page - 1 : paginate.pages - 4) : 3,
                shouldRender: paginate.pages >= 3,
                isActive: page === 3,
            };
        },
        [paginate.pages],
    );

    const getSecondThree = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label:
                    paginate.pages > 7 && page >= 5
                        ? page < paginate.pages - 3
                            ? `${page}`
                            : `${paginate.pages - 3}`
                        : '4',
                number: paginate.pages > 7 && page >= 5 ? (page < paginate.pages - 3 ? page : paginate.pages - 3) : 4,
                shouldRender: paginate.pages >= 4,
                isActive: paginate.pages < 7 ? page === 4 : 3 < page && page < paginate.pages - 2,
            };
        },
        [paginate.pages],
    );

    const getThirdThree = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label:
                    paginate.pages > 7 && page >= 5
                        ? page < paginate.pages - 2
                            ? `${page + 1}`
                            : `${paginate.pages - 2}`
                        : '5',
                number:
                    paginate.pages > 7 && page >= 5 ? (page < paginate.pages - 2 ? page + 1 : paginate.pages - 2) : 5,
                shouldRender: paginate.pages >= 5,
                isActive: (page === 5 && paginate.pages <= 7) || (paginate.pages > 7 && page === paginate.pages - 2),
            };
        },
        [paginate.pages],
    );

    const getLastDots = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label: paginate.pages > 7 ? (page >= paginate.pages - 3 ? `${paginate.pages - 1}` : '...') : '6',
                number:
                    paginate.pages > 7
                        ? page >= paginate.pages - 3
                            ? paginate.pages - 1
                            : page < 5
                            ? 6
                            : page + 2
                        : 6,
                shouldRender: paginate.pages >= 6,
                isActive: (page === 6 && paginate.pages <= 7) || (paginate.pages > 7 && page === paginate.pages - 1),
            };
        },
        [paginate.pages],
    );

    const getLastPage = useCallback(
        (page: number): IPaginationButton => {
            return {
                isDisabled: false,
                label: `${paginate.pages}`,
                number: paginate.pages,
                shouldRender: paginate.pages >= 7,
                isActive: page === paginate.pages,
            };
        },
        [paginate.pages],
    );

    const handlePageChange = useCallback(
        (page: number) => {
            setPaginate((prev) => ({
                ...prev,
                actualPage: page,
                firstPage: getFirstPage(page),
                firstDots: getFirstDots(page),
                firstThree: getFirstThree(page),
                secondThree: getSecondThree(page),
                thirdThree: getThirdThree(page),
                lastDots: getLastDots(page),
                lastPage: getLastPage(page),
            }));
        },
        [getFirstDots, getFirstThree, getLastDots, getLastPage, getSecondThree, getThirdThree],
    );

    useEffect(() => {
        if (paginate.firstPage === undefined) {
            handlePageChange(actualPage);
        }
        onChange(paginate.actualPage);
    }, [actualPage, handlePageChange, onChange, paginate]);

    useEffect(() => {
        setPaginate((p) => ({
            ...p,
            pages: pages,
            firstPage: undefined,
        }));
    }, [pages]);

    return (
        <>
            <Box
                aria-label="Pagination Navigation"
                role="navigation"
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={2}
                {...paginationProps}
            >
                <IconButton
                    aria-label="Previous page"
                    isDisabled={paginate.actualPage === 1 || (paginate.disabled ?? false)}
                    icon={<Icon as={FaAngleLeft} />}
                    onClick={() =>
                        handlePageChange(paginate.actualPage - 1 === 0 ? paginate.actualPage : paginate.actualPage - 1)
                    }
                    variant="outline"
                    mx={1}
                />

                {paginate.firstPage?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.firstPage.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.firstPage.label}</Text>}
                        onClick={() => handlePageChange(paginate.firstPage!.number!)}
                        variant={paginate.firstPage?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.firstDots?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.firstDots.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.firstDots.label}</Text>}
                        onClick={() => handlePageChange(paginate.firstDots!.number!)}
                        variant={paginate.firstDots?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.firstThree?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.firstThree.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.firstThree.label}</Text>}
                        onClick={() => handlePageChange(paginate.firstThree!.number!)}
                        variant={paginate.firstThree?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.secondThree?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.secondThree.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.secondThree.label}</Text>}
                        onClick={() => handlePageChange(paginate.secondThree!.number!)}
                        variant={paginate.secondThree?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.thirdThree?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.thirdThree.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.thirdThree.label}</Text>}
                        onClick={() => handlePageChange(paginate.thirdThree!.number!)}
                        variant={paginate.thirdThree?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.lastDots?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.lastDots.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.lastDots.label}</Text>}
                        onClick={() => handlePageChange(paginate.lastDots!.number!)}
                        variant={paginate.lastDots?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                {paginate.lastPage?.shouldRender && (
                    <IconButton
                        aria-label={`Page ${paginate.lastPage.number}`}
                        isDisabled={false}
                        icon={<Text>{paginate.lastPage.label}</Text>}
                        onClick={() => handlePageChange(paginate.lastPage!.number!)}
                        variant={paginate.lastPage?.isActive ? 'solid' : 'outline'}
                        mx={1}
                    />
                )}

                <IconButton
                    aria-label="Next Page"
                    isDisabled={paginate.actualPage === paginate.pages || (paginate.disabled ?? false)}
                    icon={<Icon as={FaAngleRight} />}
                    variant="outline"
                    onClick={() =>
                        handlePageChange(
                            paginate.pages < paginate.actualPage + 1 ? paginate.actualPage : paginate.actualPage + 1,
                        )
                    }
                    mx={1}
                />
            </Box>
        </>
    );
};

// Export
export default Pagination;

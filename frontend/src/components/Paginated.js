import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import Search from './Search';
import '../css/Community.css';
import { Button, ButtonGroup } from 'react-bootstrap';

function Paginated({ columns, data }) {
    const [globalFilter, setGlobalFilter] = useState('');

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    });

    const handleSearch = (query) => {
        setGlobalFilter(query);
    };

    const getPageNumbers = () => {
        const pages = [];
        const pageIndex = table.getState().pagination.pageIndex;
        const pageCount = table.getPageCount();
        let startPage = Math.max(pageIndex - 4, 0);
        let endPage = Math.min(startPage + 9, pageCount - 1);
        if (endPage - startPage < 9) startPage = Math.max(endPage - 9, 0);
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        return pages;
    };

    const { pageIndex } = table.getState().pagination;

    return (
        <>
            <div className="all">
                <table className="custom-table">
                    <thead className="header1">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} style={{ width: header.column.columnDef.size, cursor: 'pointer' }} onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container d-flex justify-content-center align-items-center mt-3">
                <ButtonGroup>
                    <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} variant="primary" size="sm">
                        {'<<'}
                    </Button>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="primary" size="sm">
                        이전
                    </Button>

                    {getPageNumbers().map((number) => (
                        <Button
                            key={number}
                            onClick={() => table.setPageIndex(number)}
                            variant={pageIndex === number ? 'primary' : 'light'}
                            size="sm"
                            style={{
                                backgroundColor: pageIndex === number ? '#ff8c7a' : 'lightgray',
                                color: pageIndex === number ? '#FFFFFF' : 'black',
                            }}
                        >
                            {number + 1}
                        </Button>
                    ))}

                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="primary" size="sm">
                        다음
                    </Button>
                    <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} variant="primary" size="sm">
                        {'>>'}
                    </Button>
                </ButtonGroup>
            </div>

            <Search onSubmit={handleSearch} />
        </>
    );
}

export default Paginated;

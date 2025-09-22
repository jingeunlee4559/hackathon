import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Search from '../components/Search';
import '../css/Dataroom.css';
import '../css/Community.css';

const mockData = [
    {
        id: 1,
        title: '서울시 한부모가족 주거 지원',
        round: '2025년 3차',
        applicationPeriod: '2025.09.01 ~ 2025.10.31',
        summary: '전월세 보증금 최대 6,000만원 무이자 융자 지원',
        tags: ['#서울시', '#주거지원', '#한부모', '#신청가능'],
    },
    {
        id: 2,
        title: '경기도 청년 임대주택 신청',
        round: '2025년 3차',
        applicationPeriod: '2025.09.15 ~ 2025.10.15',
        summary: '시세보다 저렴한 임대료로 주거 안정 지원',
        tags: ['#경기도', '#주거지원', '#청년', '#신청가능'],
    },
    {
        id: 3,
        title: '부산시 신혼부부 전세 대출',
        round: '2025년 4차',
        applicationPeriod: '2025.10.01 ~ 2025.11.30',
        summary: '최대 1억원 한도, 이자 1.5% 지원',
        tags: ['#부산시', '#주거지원', '#신혼부부', '#대출지원'],
    },
    {
        id: 4,
        title: '인천시 난임부부 시술비 지원',
        round: '2025년 하반기',
        applicationPeriod: '상시신청',
        summary: '체외수정, 인공수정 시술비 일부 지원',
        tags: ['#인천시', '#의료지원', '#난임부부', '#상시신청'],
    },
    {
        id: 5,
        title: '광주시 미혼모 자립 지원금',
        round: '2025년 4차',
        applicationPeriod: '2025.10.10 ~ 2025.11.10',
        summary: '초기 정착 자립 지원금 1,000만원 일시 지급',
        tags: ['#광주시', '#자립지원', '#미혼모', '#신청가능'],
    },
    {
        id: 6,
        title: '대구시 다자녀가구 교육비',
        round: '2025년 2학기',
        applicationPeriod: '2025.08.20 ~ 2025.09.20',
        summary: '셋째 이상 자녀 대학 등록금 전액 지원',
        tags: ['#대구시', '#교육지원', '#다자녀', '#장학금'],
    },
    {
        id: 7,
        title: '서울시 청년 월세 지원 사업',
        round: '2025년 3차',
        applicationPeriod: '2025.09.05 ~ 2025.09.25',
        summary: '월 20만원, 최대 10개월 월세 지원',
        tags: ['#서울시', '#주거지원', '#청년', '#월세지원'],
    },
];

const Dataroom = () => {
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = useMemo(
        () => [
            { accessorKey: 'title', header: '제목' },
            { accessorKey: 'summary', header: '요약' },
            { accessorKey: 'tags', header: '태그' },
        ],
        [],
    );

    const table = useReactTable({
        data: mockData,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 6 } },
    });

    const getPageNumbers = () => {
        const pageCount = table.getPageCount();
        const pageIndex = table.getState().pagination.pageIndex;
        const pages = [];

        let startPage = Math.max(pageIndex - 2, 0);
        let endPage = Math.min(startPage + 4, pageCount - 1);
        if (endPage - startPage < 4) {
            startPage = Math.max(endPage - 4, 0);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const { pageIndex } = table.getState().pagination;

    return (
        <Container className="py-5">
            <Row className="my-5">
                <Col className="d-flex justify-content-left">
                    <h3 style={{ fontWeight: 'bold' }}>정보자료실</h3>
                </Col>
            </Row>

            <Row xs={1} md={2} lg={3} className="g-4 mb-5">
                {table.getRowModel().rows.map((row) => (
                    <Col key={row.id}>
                        <Card className="h-100 custom-card">
                            <Card.Header className="custom-card-header">
                                {row.original.title} ({row.original.round})
                            </Card.Header>
                            <Card.Body>
                                <p>
                                    <strong className="text-muted small d-block mb-1">신청 기간:</strong>
                                    {row.original.applicationPeriod}
                                </p>
                                <p className="mb-4">
                                    <strong className="text-muted small d-block mb-1">핵심 요약:</strong>
                                    {row.original.summary}
                                </p>
                                <Card.Text className="text-secondary small">{row.original.tags.join(' ')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="pagination-container d-flex justify-content-center align-items-center mt-3 mb-4">
                <ButtonGroup>
                    <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="page-btn">
                        {'<<'}
                    </Button>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="page-btn">
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
                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="page-btn">
                        다음
                    </Button>
                    <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="page-btn">
                        {'>>'}
                    </Button>
                </ButtonGroup>
            </div>

            <Search onSubmit={setGlobalFilter} />
        </Container>
    );
};

export default Dataroom;

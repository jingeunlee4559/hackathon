// frontend/src/pages/Dataroom.js
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Pagination } from 'react-bootstrap';
import api from '../axios';            // ← 방금 만든 axios 클라이언트
// import Search from '../components/Search'; // 프로젝트에 이미 있으면 사용
import "../css/Dataroom.css"

const Dataroom = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);  // ['미혼모','주거']
  const [rows, setRows] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allTags, setAllTags] = useState([]);

  // 태그 목록 로드
  useEffect(() => {
    api.get('/api/tags').then(res => setAllTags(res.data));
  }, []);

  // 정책 목록 로드
  useEffect(() => {
    const fetchPolicies = async () => {
      const res = await api.get('/api/policies', {
        params: {
          page: pageIndex,
          size: 6,
          query: globalFilter,
          tags: selectedTags.join(','),
          sort: 'new',
        },
      });
      setRows(res.data.items || []);
      setTotalPages(res.data.totalPages ?? 0);
    };
    fetchPolicies().catch(console.error);
  }, [pageIndex, globalFilter, selectedTags]);

  // 페이지 버튼 표시를 위한 헬퍼
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(pageIndex - 2, 0);
    let end = Math.min(start + 4, Math.max(totalPages - 1, 0));
    if (end - start < 4) start = Math.max(end - 4, 0);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <Container className="py-3">
    <Row className='my-5'></Row>
               <Row className="my-5">
                        <Col className="d-flex justify-content-left">
                            <h3 style={{ fontWeight: 'bold' }}>정보자료실</h3>
                        </Col>
                    </Row>
      {/* 태그 토글 버튼 */}
      <div className="mb-3">
        {allTags.map(t => (
<Button
  key={t.tagId}
  size="sm"
  variant="outline-secondary" 
  className={`me-2 mb-2 ${selectedTags.includes(t.tagName) ? 'btn-tag-active' : ''}`}
  onClick={() => {
    setPageIndex(0);
    setSelectedTags(prev =>
      prev.includes(t.tagName)
        ? prev.filter(x => x !== t.tagName)
        : [...prev, t.tagName]
    );
  }}
>
  #{t.tagName}
</Button>
        ))}
        {/* 간단 검색 입력 (Search 컴포넌트 대체용) */}
        <input
          placeholder="검색어를 입력하세요"
          className="form-control mt-2"
          value={globalFilter}
          onChange={e => { setPageIndex(0); setGlobalFilter(e.target.value); }}
        />
      </div>

      {/* 카드 3 x 2 */}
      <Row xs={1} md={3} className="g-4">
        {rows.map(row => (
          <Col key={row.id}>
            <Card onClick={() => row.linkUrl && window.open(row.linkUrl, '_blank')} style={{ cursor: 'pointer' }} className='custom-card-header '>
              {row.imageUrl && <Card.Img variant="top" src={row.imageUrl} alt={row.title} />}
              <Card.Body>
                <Card.Title className="mb-1">{row.title}</Card.Title>
                <div className="text-muted small">신청 기간: {row.startDay} ~ {row.endDay}</div>
                <p className="mt-2 mb-2">{row.summary}</p>
                <div className="text-secondary small">
                  {(row.tags || []).map(t => `#${t} `)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 페이지네이션 */}
<div className="custom-pagination d-flex justify-content-center mt-3">
  <Pagination>
    <Pagination.First onClick={() => setPageIndex(0)} disabled={pageIndex === 0} />
    <Pagination.Prev onClick={() => setPageIndex(p => Math.max(p - 1, 0))} disabled={pageIndex === 0} />
    {getPageNumbers().map(n => (
      <Pagination.Item
        key={n}
        active={pageIndex === n} 
        onClick={() => setPageIndex(n)}
      >
        {n + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      onClick={() => setPageIndex(p => Math.min(p + 1, totalPages - 1))}
      disabled={pageIndex >= totalPages - 1}
    />
    <Pagination.Last onClick={() => setPageIndex(totalPages - 1)} disabled={pageIndex >= totalPages - 1} />
  </Pagination>
</div>
    </Container>
  );
};

export default Dataroom;

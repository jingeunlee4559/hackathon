import React, { useEffect, useState } from 'react';
import Paginated from '../components/Paginated';
import '../css/Community.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const boardPostsData = [
    {
        id: 1,
        title: '한부모가족 지원금 신청 방법 아시는 분?',
        author: '용감한 엄마',
        date: '2025-09-18',
        views: 152,
    },
    {
        id: 2,
        title: '아이랑 둘이서 갈만한 여행지 추천해주세요.',
        author: '희망아빠',
        date: '2025-09-18',
        views: 278,
    },
    {
        id: 3,
        title: '정부 아이돌봄 서비스 이용 후기 공유해요.',
        author: '쑥쑥이맘',
        date: '2025-09-17',
        views: 95,
    },
    {
        id: 4,
        title: '육아 스트레스, 다들 어떻게 푸시나요? ㅠㅠ',
        author: '씩씩대디',
        date: '2025-09-16',
        views: 420,
    },
    {
        id: 5,
        title: '어린이집 입소 준비물 리스트입니다.',
        author: '친절한 이웃',
        date: '2025-09-15',
        views: 188,
    },
    {
        id: 1,
        title: '한부모가족 지원금 신청 방법 아시는 분?',
        author: '용감한 엄마',
        date: '2025-09-18',
        views: 152,
    },
    {
        id: 2,
        title: '아이랑 둘이서 갈만한 여행지 추천해주세요.',
        author: '희망아빠',
        date: '2025-09-18',
        views: 278,
    },
    {
        id: 3,
        title: '정부 아이돌봄 서비스 이용 후기 공유해요.',
        author: '쑥쑥이맘',
        date: '2025-09-17',
        views: 95,
    },
    {
        id: 4,
        title: '육아 스트레스, 다들 어떻게 푸시나요? ㅠㅠ',
        author: '씩씩대디',
        date: '2025-09-16',
        views: 420,
    },
    {
        id: 5,
        title: '어린이집 입소 준비물 리스트입니다.',
        author: '친절한 이웃',
        date: '2025-09-15',
        views: 188,
    },
    {
        id: 1,
        title: '한부모가족 지원금 신청 방법 아시는 분?',
        author: '용감한 엄마',
        date: '2025-09-18',
        views: 152,
    },
    {
        id: 2,
        title: '아이랑 둘이서 갈만한 여행지 추천해주세요.',
        author: '희망아빠',
        date: '2025-09-18',
        views: 278,
    },
    {
        id: 3,
        title: '정부 아이돌봄 서비스 이용 후기 공유해요.',
        author: '쑥쑥이맘',
        date: '2025-09-17',
        views: 95,
    },
    {
        id: 4,
        title: '육아 스트레스, 다들 어떻게 푸시나요? ㅠㅠ',
        author: '씩씩대디',
        date: '2025-09-16',
        views: 420,
    },
    {
        id: 5,
        title: '어린이집 입소 준비물 리스트입니다.',
        author: '친절한 이웃',
        date: '2025-09-15',
        views: 188,
    },
];

const Community = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setPosts(boardPostsData);
    }, []);

    const handlePostClick = (id) => {
        try {
            //await axios.get(`/api/board/${board_seq}`);
            navigate(`/Community/${id}`);
        } catch (error) {
            console.error('조회수 증가 실패', error);
        }
    };

    return (
        <>
            <Container>
                <Row className="mt-5"></Row>
                <Row className="my-5">
                    <Col className="d-flex justify-content-left">
                        <h3 style={{ fontWeight: 'bold' }}>커뮤니티</h3>
                    </Col>
                </Row>
                <Row className='my-4' >
                    <Col xs={12} className="d-flex justify-content-end">
                        <Button id="write-button" variant="primary" onClick={() => navigate('/writePost')}>
                            글쓰기
                        </Button>
                    </Col>
                </Row>
                <Paginated
                    data={posts.map((post, index) => ({
                        index: index + 1,
                        id: post.id,
                        title: post.title,
                        author: post.author,
                        date: post.date,
                        views: post.views,
                    }))}
                    columns={[
                        { accessorKey: 'index', header: '순서', size: 60 },
                        {
                            accessorKey: 'title',
                            header: '제목',
                            size: 500,
                            cell: (info) => (
                                <span onClick={() => handlePostClick(info.row.original.id)} style={{ cursor: 'pointer', color: '#0056b3' }}>
                                    {info.getValue()}
                                </span>
                            ),
                        },
                        { accessorKey: 'author', header: '작성자', size: 120 },
                        { accessorKey: 'date', header: '날짜', size: 150 },
                        { accessorKey: 'views', header: '조회', size: 80 },
                    ]}
                />
            </Container>
        </>
    );
};

export default Community;

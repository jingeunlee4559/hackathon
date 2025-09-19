import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/DetailPage.css';
import { Row, Button, Col, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const boardPostsData = [
    {
        id: 1,
        title: '한부모가족 지원금 신청 방법 아시는 분?',
        author: '용감한 엄마',
        date: '2025-09-18',
        views: 152,
        content: '안녕하세요, 정부에서 지원하는 한부모가족 지원금 신청 절차나 필요 서류에 대해 알고 싶어요. 혹시 경험 있으신 분 계시면 정보 좀 공유해주실 수 있을까요? 감사합니다!',
        imageUrl: 'https://via.placeholder.com/800x400.png?text=게시글+이미지+1',
    },
    {
        id: 2,
        title: '아이랑 둘이서 갈만한 여행지 추천해주세요.',
        author: '희망아빠',
        date: '2025-09-18',
        views: 278,
        content: '3살 아이와 함께 휴식을 취할 수 있는 작은 여행을 계획 중입니다. 아이에게 안전하고 즐거운 장소로 추천해주실 만한 곳이 있을까요? 되도록 멀지 않은 곳이면 좋겠습니다.',
        imageUrl: null,
    },
    {
        id: 3,
        title: '정부 아이돌봄 서비스 이용 후기 공유해요.',
        author: '쑥쑥이맘',
        date: '2025-09-17',
        views: 95,
        content:
            '정부에서 운영하는 아이돌봄 서비스를 이용해 본 긍정적인 경험을 나누고 싶어요. 처음엔 걱정이 많았지만, 계속 일하는 데 큰 도움이 되었습니다. 이용을 고민하는 분들을 위해 몇 가지 팁을 남깁니다.',
        imageUrl: 'https://via.placeholder.com/800x400.png?text=게시글+이미지+3',
    },
    {
        id: 4,
        title: '육아 스트레스, 다들 어떻게 푸시나요? ㅠㅠ',
        author: '씩씩대디',
        date: '2025-09-16',
        views: 420,
        content: '최근 육아 스트레스 때문에 너무 지치네요. 힘든 날들이 계속되는데, 다들 스트레스는 어떻게 관리하고 자신만의 시간을 보내시는지 궁금합니다. 어떤 조언이든 큰 힘이 될 것 같아요.',
        imageUrl: null,
    },
    {
        id: 5,
        title: '어린이집 입소 준비물 리스트입니다.',
        author: '친절한 이웃',
        date: '2025-09-15',
        views: 188,
        content: '저희 아이가 어린이집에 처음 갈 때 뭘 챙겨야 할지 막막했었어요. 그래서 다른 부모님들께 도움이 될까 싶어 꼼꼼하게 정리한 준비물 리스트를 공유합니다. 부디 도움이 되길 바랍니다!',
        imageUrl: null,
    },
];

const mockComments = [
    { id: 1, author: '희망이', content: '좋은 정보 감사합니다! 저도 신청해봐야겠어요.', date: '2025-09-18' },
    { id: 2, author: '행복맘', content: '저도 이 부분이 궁금했는데, 덕분에 알아갑니다.', date: '2025-09-18' },
];

const DetailPage = () => {
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState(null);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);

    const addComment = (text) => {
        const newComment = {
            id: comments.length + 3,
            author: '현재사용자',
            content: text,
            date: '2025-09-18',
        };
        setComments([newComment, ...comments]);
    };

    useEffect(() => {
        const post = boardPostsData.find((p) => p.id === parseInt(id));

        if (post) {
            setPostDetail(post);
        }

        setComments(mockComments);
    }, [id]);

    const deletePost = () => {
        Swal.fire({
            icon: 'warning',
            title: '정말 삭제하시겠습니까?',
            text: '삭제한 내용은 되돌릴 수 없습니다.',
            showCancelButton: true,
            confirmButtonText: '네, 삭제할게요',
            cancelButtonText: '아니요',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`ID ${id}번 게시글이 삭제되었습니다.`);
                Swal.fire('삭제 완료!', '게시글이 성공적으로 삭제되었습니다.', 'success').then(() => {
                    navigate('/community');
                });
            }
        });
    };

    if (!postDetail) {
        return (
            <Container>
                <div className="text-center mt-5">게시글을 불러오는 중입니다...</div>
            </Container>
        );
    }

    return (
        <>
            <Row className="mt-5 pt-5"></Row>
            <Container className="detail-container pt-5 mt-5">
                {/* <Row className="button-group mb-4">
                    <Col className="text-end">
                        <Button onClick={() => navigate('/community')} variant="secondary" className="btn me-2">
                            목록
                        </Button>
                        <Button onClick={deletePost} variant="danger" className="btn">
                            삭제
                        </Button>
                    </Col>
                </Row> */}

                <div className="detail-content">
                    <h3 className="detail-title">{postDetail.title}</h3>
                    <p className="detail-info">
                        작성자: {postDetail.author} | 날짜: {postDetail.date} | 조회수: {postDetail.views}
                    </p>
                    <hr />

                    {postDetail.imageUrl && (
                        <div className="text-center my-4">
                            <img src={postDetail.imageUrl} alt={postDetail.title} className="img-fluid rounded" />
                        </div>
                    )}

                    <p className="detail-text" style={{ whiteSpace: 'pre-wrap' }}>
                        {postDetail.content}
                    </p>
                </div>

                <Row className="t2 mb-4 pt-5" id="detail">
                    <Col xs="auto">
                        댓글 <span style={{ color: '#ff8c7a' }}>({comments.length}개)</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CommentForm onSubmit={addComment} />
                    </Col>
                </Row>
                <Row>
                    <CommentList comments={comments} />
                </Row>
            </Container>
        </>
    );
};

export default DetailPage;

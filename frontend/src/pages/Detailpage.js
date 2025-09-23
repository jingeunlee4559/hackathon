import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/DetailPage.css';
import { Row, Button, Col, Container, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import axios from '../axios';

const boardPostsData = [
    {
        id: 1,
        title: '한부모가족 지원금 신청 방법 아시는 분?',
        author: '용감한 엄마',
        date: '2025-09-18',
        views: 152,
        content: '안녕하세요, 정부에서 지원하는 한부모가족 지원금 신청 절차나 필요 서류에 대해 알고 싶어요. 혹시 경험 있으신 분 계시면 정보 좀 공유해주실 수 있을까요? 감사합니다!',
        imageUrl: "/img/mainimg.png",
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
            imageUrl: "/img/mainimg.png",
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
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const addComment = async (text, author) => {
        try {
            const newComment = {
                communityId: parseInt(id),
                content: text,
                commentsWriter: author
            };

            await axios.post('/api/comments', newComment);
            // 댓글 추가 후 댓글 목록 다시 불러오기
            fetchComments();

            Swal.fire({
                icon: 'success',
                text: '댓글이 성공적으로 등록되었습니다.',
                confirmButtonText: '확인',
                timer: 2000
            });
        } catch (error) {
            console.error('댓글 등록 오류:', error);
            Swal.fire({
                icon: 'error',
                text: '댓글 등록 중 오류가 발생했습니다.',
                confirmButtonText: '확인'
            });
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/community/${id}`);
            console.log('댓글 데이터:', response.data); // 디버깅용
            setComments(response.data);
        } catch (error) {
            console.error('댓글 조회 오류:', error);
            // 오류 시 빈 배열로 설정
            setComments([]);
        }
    };

    const fetchPostDetail = async () => {
        try {
            console.log('게시글 상세 정보 요청:', id);
            const response = await axios.get(`/api/community/${id}`);
            console.log('받은 게시글 상세 데이터:', response.data);

            const post = response.data;
            setPostDetail(post);
            setEditedTitle(post.title);
            setEditedContent(post.content);
            if (post.imageUrl) {
                setPreviewImage(post.imageUrl);
            }
        } catch (error) {
            console.error('게시글 상세 정보 조회 오류:', error);
            // 오류 시 더미 데이터에서 찾기
            const post = boardPostsData.find((p) => p.id === parseInt(id));
            if (post) {
                setPostDetail(post);
                setEditedTitle(post.title);
                setEditedContent(post.content);
                if (post.imageUrl) {
                    setPreviewImage(post.imageUrl);
                }
            }
        }
    };

    useEffect(() => {
        fetchPostDetail();
        fetchComments();
    }, [id]);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = async () => {
        const updateData = {
            title: editedTitle,
            content: editedContent
        };

        try {
            const response = await axios.put(`/api/community/${id}`, updateData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setIsEditing(false);
            // 업데이트된 데이터를 상태에 반영
            setPostDetail({
                ...postDetail,
                title: editedTitle,
                content: editedContent
            });
            Swal.fire({
                icon: 'success',
                text: '수정 성공!',
                confirmButtonText: '확인'
            });
        } catch (error) {
            console.error("게시글 수정 도중 오류 발생:", error);
            Swal.fire({
                icon: 'error',
                text: '수정 도중 오류가 발생했습니다.',
                confirmButtonText: '확인'
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        document.getElementById('imageInput').click();
    };

    const handleRemoveImage = () => {
        setPreviewImage('');
        setSelectedFile(null);
    };

    function deletepost() {
        Swal.fire({
            icon: 'question',
            text: '정말 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/community/${id}`);
                    Swal.fire({
                        icon: 'success',
                        text: '삭제 성공!',
                        confirmButtonText: '확인',
                    }).then(() => {
                        navigate('/Community');
                    });
                } catch (error) {
                    console.error('게시글 삭제 도중 오류 발생:', error);
                    Swal.fire({
                        icon: 'error',
                        text: '삭제 도중 오류가 발생했습니다.',
                        confirmButtonText: '확인',
                    });
                }
            }
        });
    }

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
        {!isEditing && (
                    <Row className="button-group">
                        <Col>   
                        {/* {postDetail?.editable && ( */}
                            <Button onClick={handleEdit} variant='warning' className="btn me-2">
                                수정
                            </Button>
                        {/* )} */}
                            {/* <Button variant="warning" className="btn me-2"></Button> */}
                        {/* {postDetail?.deletable && ( */}
                            <Button onClick={deletepost} variant="danger" className="btn">
                                삭제
                            </Button>
                        {/* )} */}
                            
                        </Col>
                    </Row>
                )}
                      {isEditing ? (
                    <div className="detail-content">
                        <Form.Group controlId="formTitle" className="title">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} placeholder="제목을 입력하세요" />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="content">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" rows={10} value={editedContent} onChange={(e) => setEditedContent(e.target.value)} placeholder="내용을 입력하세요" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="file">
                            <Form.Label>이미지 파일</Form.Label>
                            <Button variant="primary" onClick={triggerFileInput} className="custom-select-button">
                                이미지 선택
                            </Button>
                            <input id="imageInput" type="file" className="hidden-file-input" style={{ display: 'none' }} onChange={handleFileChange} />
                            {previewImage && (
                                <div className="image-preview">
                                    <img src={previewImage} alt="미리보기" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                    <Button variant="danger" onClick={handleRemoveImage} style={{ marginTop: '10px' }}>
                                        이미지 제거
                                    </Button>
                                </div>
                            )}
                        </Form.Group>
                        {/* <Button variant="success" className="mt-3"> */}
                        <Button onClick={handleSave} variant="success" style={{backgroundColor:"#ff8c7a"}} className="mt-3">
                            저장
                        </Button>
                    </div>
                           ) : (
                    <>
                <div className="detail-content">
                    <h3 className="detail-title">{postDetail.title}</h3>
                    <p className="detail-info">
                        작성자: {postDetail.writer || postDetail.author} |
                        날짜: {postDetail.createdAt ? new Date(postDetail.createdAt).toLocaleDateString() : postDetail.date} |
                        조회수: {postDetail.viewCount || postDetail.views || 0}
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
                </>
                     )}
            </Container>
        </>
    );
};

export default DetailPage;

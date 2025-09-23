import React, { useState, useRef } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from '../axios';
import '../css/WritePost.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const WritePost = () => {
    const [groomUploaded, setGroomUploaded] = useState(false);
    const [boardImg, setBoardImg] = useState(null);
    const navigate = useNavigate();
    const bTitle = useRef();
    const bContent = useRef();
    const bWriter = useRef();
    const bImg = useRef();

    const handleGroomUpload = (event) => {
        setGroomUploaded(true);
        setBoardImg(event.target.files[0]); // Update state with the selected file
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 입력값 검증
        if (!bTitle.current.value.trim() || !bContent.current.value.trim() || !bWriter.current.value.trim()) {
            Swal.fire({
                icon: 'warning',
                text: '제목, 내용, 작성자를 모두 입력해주세요.',
                confirmButtonText: '확인'
            });
            return;
        }

        const postData = {
            title: bTitle.current.value.trim(),
            content: bContent.current.value.trim(),
            writer: bWriter.current.value.trim()
        };

        try {
            console.log('게시글 작성 요청:', postData); // 디버깅용
            const response = await axios.post('/api/community', postData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('게시글 작성 성공:', response.data);

            Swal.fire({
                icon: 'success',
                text: '게시글이 성공적으로 작성되었습니다!',
                confirmButtonText: '확인',
                timer: 2000
            }).then(() => {
                navigate('/Community'); // 커뮤니티 페이지로 이동
            });
        } catch (error) {
            console.error('게시글 작성 오류:', error);

            let errorMessage = '게시글 작성 중 오류가 발생했습니다.';
            if (error.response) {
                // 서버에서 응답이 온 경우
                console.error('서버 응답 오류:', error.response.data);
                console.error('상태 코드:', error.response.status);
                errorMessage = `서버 오류 (${error.response.status}): ${error.response.data || '알 수 없는 오류'}`;
            } else if (error.request) {
                // 요청을 보냈지만 응답을 받지 못한 경우
                console.error('네트워크 오류:', error.request);
                errorMessage = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
            } else {
                // 요청 설정 중 오류가 발생한 경우
                console.error('요청 설정 오류:', error.message);
                errorMessage = `요청 오류: ${error.message}`;
            }

            Swal.fire({
                icon: 'error',
                title: '게시글 작성 실패',
                text: errorMessage,
                confirmButtonText: '확인'
            });
        }
    };

    return (
        <>
            <Row className="mt-5"></Row>
            <Container className="my-5">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col style={{ fontSize: '25px', fontWeight: 'bold' }}>게시판 작성</Col>
                    </Row>
                    <Row>
                        <Col className="t2">제목</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Control type="text" placeholder="제목" ref={bTitle} required />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="t2">작성자</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Control type="text" placeholder="작성자" ref={bWriter} required />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="t2">내용</Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Control as="textarea" placeholder="내용" ref={bContent} style={{ height: '500px' }} required />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="t2">첨부파일</Col>
                    </Row>
                    <Row className="my-5">
                        <Col className="m-auto text-center">
                            <div className={`image-upload-boxs ${groomUploaded ? 'uploaded' : ''}`}>
                                <label htmlFor="groom-upload" className="custom-file-uploads">
                                    {groomUploaded ? '이미지가 업로드 되었습니다' : '이미지를 올려주세요'}
                                </label>
                                <input id="groom-upload" type="file" ref={bImg} onChange={handleGroomUpload} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="my-5">
                            <Button
                                type="button"
                                className="me-4"
                                style={{ backgroundColor: '#ff8c7a', color: 'black', border: '#ff8c7a' }}
                                onClick={() => navigate('/Community')}
                            >
                                취소
                            </Button>
                            <Button
                                type="submit"
                                className="me-4"
                                style={{ backgroundColor: '#ff8c7a', color: 'black', border: '#ff8c7a' }}
                            >
                                작성
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default WritePost;

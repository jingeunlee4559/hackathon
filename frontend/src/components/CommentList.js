import React, { useState } from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import '../css/Comment.css';

const CommentList = ({ comments }) => {
    const [showAll, setShowAll] = useState(false);

    // 디버깅용 로그
    console.log('CommentList - 받은 댓글들:', comments);

    // 댓글 표시 개수 제어
    const visibleComments = showAll ? comments : comments.slice(0, 3);

    if (comments.length === 0) {
        return (
            <div className="no-comments">
                <div className="no-comments-icon">💬</div>
                <div>아직 댓글이 없습니다.</div>
                <div>첫 댓글을 작성해 주세요!</div>
            </div>
        );
    }

    return (
        <>
            <ListGroup variant="flush" className="comment-list">
                {visibleComments.map((comment, index) => {
                    const authorName = comment.commentsWriter || comment.author || '익명';
                    const authorInitial = authorName.charAt(0).toUpperCase();

                    return (
                        <ListGroup.Item key={comment.commentId || comment.id || index} className="comment-item">
                            <div className="comment-header">
                                <div className="comment-author">
                                    <div className="comment-author-icon">
                                        {authorInitial}
                                    </div>
                                    <div className="comment-author-name">
                                        {authorName}
                                    </div>
                                </div>
                                <div className="comment-date">
                                    {(() => {
                                        console.log('댓글 시간 데이터:', comment.commentCreatedAt, comment.date);
                                        if (comment.commentCreatedAt) {
                                            try {
                                                return new Date(comment.commentCreatedAt).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                });
                                            } catch (e) {
                                                console.error('날짜 변환 오류:', e);
                                                return comment.commentCreatedAt;
                                            }
                                        }
                                        return comment.date || '방금 전';
                                    })()}
                                </div>
                            </div>
                            <div className="comment-text">
                                {comment.content}
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>

            {comments.length > 3 && (
                <div className="text-center">
                    <Button
                        onClick={() => setShowAll(!showAll)}
                        className="comment-more-button"
                    >
                        {showAll ? '댓글 접기 ▲' : '댓글 더보기 ▼'}
                    </Button>
                </div>
            )}
        </>
    );
};

export default CommentList;

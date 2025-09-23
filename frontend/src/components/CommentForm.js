import React, { useState } from 'react';
import { Form, Button, Card, FormControl } from 'react-bootstrap';
import '../css/Comment.css';

const CommentForm = ({ onSubmit }) => {
    const [commentText, setCommentText] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim() || !author.trim()) return;
        onSubmit(commentText, author);
        setCommentText('');
        setAuthor('');
    };

    return (
        <Card className="comment-form-card">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="author-input">
                        <FormControl
                            type="text"
                            placeholder="✏️ 작성자명을 입력해주세요"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="comment-input-section">
                        <FormControl
                            as="textarea"
                            placeholder="💬 댓글을 입력해주세요..."
                            className="comment-textarea"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                        />
                        <Button type="submit" id="submitCommentButton">
                            💌<br/>등록
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CommentForm;

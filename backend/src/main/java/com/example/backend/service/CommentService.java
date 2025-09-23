package com.example.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.mapper.CommentMapper;
import com.example.backend.model.Comment;

@Service
public class CommentService {
    @Autowired
    private CommentMapper mapper;

    public List<Comment> getCommentsByCommunityId(Integer communityId) {
        return mapper.findByCommunityId(communityId);
    }

    public void addComment(Comment comment) {
        mapper.insertComment(comment);
    }

    public void updateComment(Comment comment) {
        mapper.updateComment(comment);
    }

    public void removeComment(Integer commentId) {
        mapper.deleteComment(commentId);
    }
}

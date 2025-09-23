package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.backend.model.Comment;

@Mapper
public interface CommentMapper {
    List<Comment> findByCommunityId(Integer communityId);
    void insertComment(Comment comment);
    void updateComment(Comment comment);
    void deleteComment(Integer commentId);
}

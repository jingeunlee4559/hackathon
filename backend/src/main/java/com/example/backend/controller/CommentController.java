package com.example.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.model.Comment;
import com.example.backend.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<Comment>> getCommentsByCommunityId(@PathVariable Integer communityId) {
        List<Comment> comments = commentService.getCommentsByCommunityId(communityId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<String> addComment(@RequestBody Comment comment) {
        commentService.addComment(comment);
        return ResponseEntity.ok("댓글이 성공적으로 등록되었습니다.");
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable Integer commentId, @RequestBody Comment comment) {
        comment.setCommentId(commentId);
        commentService.updateComment(comment);
        return ResponseEntity.ok("댓글이 성공적으로 수정되었습니다.");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer commentId) {
        commentService.removeComment(commentId);
        return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
    }
}

package com.example.backend.service;

import org.springframework.ui.Model;

import com.example.backend.model.Community;



public interface CommunityService {
	// Service Class의 틀이 될 interface
	//게시글 목록
	public String list(Model model);

    // 게시글 작성
    public String insert(Community vo);

    // 게시글삭제
    public String delete(Long communityId);

    // 게시글 수정페이지
    public String updatePage(Long communityId, Model model);

    // 게시글 수정

    public String update(Long viewCount, Long communityId);

    
}
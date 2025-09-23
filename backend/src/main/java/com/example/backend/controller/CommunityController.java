package com.example.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Community;
import com.example.backend.service.CommunityService;

@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "http://localhost:3000")
public class CommunityController {
    
    @Autowired
    private CommunityService service;


	// 게시글 목록보기
    @GetMapping
	public ResponseEntity<List<Community>> communityList() {
		List<Community> communities = service.getAllCommunities();
		return ResponseEntity.ok(communities);
	}

	// 게시글 작성
	@PostMapping
	public ResponseEntity<String> insert(@RequestBody Community vo){
		try {
			System.out.println("받은 게시글 데이터: " + vo.toString());
			service.insertCommunity(vo);
			System.out.println("게시글 저장 완료");
			return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
		} catch (Exception e) {
			System.err.println("게시글 저장 중 오류: " + e.getMessage());
			e.printStackTrace();
			return ResponseEntity.status(500).body("게시글 저장 중 오류가 발생했습니다: " + e.getMessage());
		}
	}

	// 게시글 삭제
	@DeleteMapping("/{communityId}")
	public ResponseEntity<String> delete(@PathVariable int communityId){
		service.deleteCommunity(communityId);
		return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
	}

	// 게시글 상세보기
	@GetMapping("/{communityId}")
	public ResponseEntity<Community> communityDetail(@PathVariable int communityId){
		Community community = service.getCommunityById(communityId);
		return ResponseEntity.ok(community);
	}

	// 게시글 수정
	@PutMapping("/{communityId}")
	public ResponseEntity<String> update(@PathVariable int communityId, @RequestBody Community vo){
		vo.setCommunityId(communityId);
		service.updateCommunity(vo);
		return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
	}
}

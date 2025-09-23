package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.mapper.CommunityMapper;
import com.example.backend.model.Community;

@Service
@Transactional
public class CommunityService {

    @Autowired
    private CommunityMapper mapper;

    public List<Community> getAllCommunities() {
        List<Community> communities = mapper.communityList();
        System.out.println("조회된 게시글 수: " + communities.size());
        return communities;
    }

    public void insertCommunity(Community vo) {
        System.out.println("게시글 저장 시작: " + vo.toString());
        mapper.insert(vo);
        System.out.println("게시글 저장 완료");
    }

    public void deleteCommunity(int communityId) {
        mapper.delete(communityId);
    }

    public Community getCommunityById(int communityId) {
        mapper.incrementViewCount(communityId);
        return mapper.selectOne(communityId);
    }

    public void updateCommunity(Community vo) {
        mapper.update(vo);
    }

}

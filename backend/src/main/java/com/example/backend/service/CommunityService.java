package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.mapper.CommunityMapper;
import com.example.backend.model.Community;

@Service
public class CommunityService {

    @Autowired
    private CommunityMapper mapper;

    public List<Community> getAllCommunities() {
        return mapper.communityList();
    }

    public void insertCommunity(Community vo) {
        mapper.insert(vo);
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

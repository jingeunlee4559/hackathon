package com.example.backend.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.example.backend.model.Community;

@Mapper
public interface CommunityMapper {
    ArrayList<Community> communityList();

    int insert(Community vo);

    int delete(int communityId);

    Community selectOne(int communityId);

    int update(Community vo);

    int incrementViewCount(int communityId);

}

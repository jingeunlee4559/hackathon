package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.example.backend.model.Member;



@Mapper
public interface MemberMapper {

    List<Member> getAllMembers();

}




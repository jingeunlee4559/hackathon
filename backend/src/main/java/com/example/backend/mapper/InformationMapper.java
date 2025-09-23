package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.example.backend.model.Information;
import com.example.backend.model.Tag;

@Mapper
public interface InformationMapper {
  // 목록(검색/태그/페이지/정렬)
  List<Information> findPolicies(@Param("query") String query,
                                 @Param("tagIds") List<Integer> tagIds,
                                 @Param("size") int size,
                                 @Param("offset") int offset,
                                 @Param("sort") String sort);

  long countPolicies(@Param("query") String query,
                     @Param("tagIds") List<Integer> tagIds);

  // 개별 글의 태그
  List<Tag> findTagsByInformationId(@Param("informationId") Long informationId);

  // tag 이름 → id
  List<Tag> findTagIdsByNames(@Param("names") List<String> names);

  // 관리자용 CRUD
  int insertInformation(Information info);
  int updateInformation(Information info);
  int deleteInformation(@Param("id") Long id);

  int insertInformationTag(@Param("informationId") Long informationId,
                           @Param("tagId") Integer tagId);
  int deleteInformationTags(@Param("informationId") Long informationId);
}

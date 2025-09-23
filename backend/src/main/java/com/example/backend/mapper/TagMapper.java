package com.example.backend.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.example.backend.model.Tag;

@Mapper
public interface TagMapper {
  List<Tag> findAll();
  Tag findByName(@Param("name") String name);
  int insert(Tag tag);
}

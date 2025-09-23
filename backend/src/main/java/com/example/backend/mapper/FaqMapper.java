package com.example.backend.mapper;

import com.example.backend.model.FaqItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FaqMapper {

    void insert(FaqItem faqItem);

    List<FaqItem> search(@Param("q") String query, @Param("limit") int limit);

    List<FaqItem> findAll(@Param("limit") int limit);
}
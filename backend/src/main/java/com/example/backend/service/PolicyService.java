package com.example.backend.service;

import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.backend.mapper.InformationMapper;
import com.example.backend.mapper.TagMapper;
import com.example.backend.model.Information;
import com.example.backend.model.Tag;
import com.example.backend.model.dto.PageResponse;
import com.example.backend.model.dto.PolicyCardDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PolicyService {
  private final InformationMapper informationMapper;
  private final TagMapper tagMapper;

  public PageResponse<PolicyCardDto> searchPolicies(String query, List<String> tagNames,
                                                    int page, int size, String sort) {
    if (page < 0) page = 0;
    if (size <= 0) size = 6;

    List<Integer> tagIds = null;
    if (tagNames != null && !tagNames.isEmpty()) {
      List<Tag> tags = informationMapper.findTagIdsByNames(tagNames);
      tagIds = tags.stream().map(Tag::getTagId).toList();
      if (tagIds.isEmpty()) {
        return PageResponse.<PolicyCardDto>builder()
          .items(List.of()).page(page).size(size)
          .totalItems(0).totalPages(0).build();
      }
    }

    int offset = page * size;
    String q = (StringUtils.hasText(query) ? query.trim() : null);

    List<Information> infos = informationMapper.findPolicies(q, tagIds, size, offset, sort);
    long total = informationMapper.countPolicies(q, tagIds);

    // 태그 붙이기(단건 쿼리; 목록 6개라 부담 적음)
    Map<Long, List<String>> tagsByInfo = new HashMap<>();
    for (Information i : infos) {
      List<Tag> tlist = informationMapper.findTagsByInformationId(i.getInformationId());
      tagsByInfo.put(i.getInformationId(),
          tlist.stream().map(Tag::getTagName).collect(Collectors.toList()));
    }

    List<PolicyCardDto> items = infos.stream().map(i ->
      PolicyCardDto.builder()
        .id(i.getInformationId())
        .title(i.getInformationTitle())
        .summary(truncate(i.getInformationContent(), 80))
        .startDay(i.getStartDay())
        .endDay(i.getEndDay())
        .imageUrl(i.getImageUrl())
        .linkUrl(i.getLinkUrl())
        .tags(tagsByInfo.getOrDefault(i.getInformationId(), List.of()))
        .build()
    ).toList();

    int totalPages = (int)Math.ceil(total / (double)size);
    return PageResponse.<PolicyCardDto>builder()
      .items(items).page(page).size(size).totalItems(total).totalPages(totalPages).build();
  }

  @Transactional
  public Long createPolicy(Information info, List<String> tagNames) {
    informationMapper.insertInformation(info);
    Long id = info.getInformationId();

    // 태그 upsert + 매핑
    for (String name : tagNames == null ? List.<String>of() : tagNames) {
      Tag t = tagMapper.findByName(name);
      if (t == null) { t = new Tag(); t.setTagName(name); tagMapper.insert(t); }
      informationMapper.insertInformationTag(id, t.getTagId());
    }
    return id;
  }

  @Transactional
  public void updatePolicy(Information info, List<String> tagNames) {
    informationMapper.updateInformation(info);
    informationMapper.deleteInformationTags(info.getInformationId());
    for (String name : tagNames == null ? List.<String>of() : tagNames) {
      Tag t = tagMapper.findByName(name);
      if (t == null) { t = new Tag(); t.setTagName(name); tagMapper.insert(t); }
      informationMapper.insertInformationTag(info.getInformationId(), t.getTagId());
    }
  }

  @Transactional
  public void deletePolicy(Long id) {
    informationMapper.deleteInformationTags(id);
    informationMapper.deleteInformation(id);
  }

  private String truncate(String s, int len) { return s == null ? "" : (s.length()<=len ? s : s.substring(0,len)+"..."); }
}

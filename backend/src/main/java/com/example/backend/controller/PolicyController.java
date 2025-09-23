package com.example.backend.controller;

import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Information;
import com.example.backend.model.Tag;
import com.example.backend.model.dto.PageResponse;
import com.example.backend.model.dto.PolicyCardDto;
import com.example.backend.service.PolicyService;
import com.example.backend.service.TagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PolicyController {
  private final PolicyService policyService;
  private final TagService tagService;

  @GetMapping("/tags")
  public List<Tag> tags() { return tagService.getAll(); }

  @GetMapping("/policies")
  public PageResponse<PolicyCardDto> getPolicies(
      @RequestParam(required=false) String query,
      @RequestParam(required=false) String tags,
      @RequestParam(defaultValue="0") int page,
      @RequestParam(defaultValue="6") int size,
      @RequestParam(defaultValue="new") String sort
  ){
    List<String> tagNames = (tags==null || tags.isBlank())
      ? List.of()
      : Arrays.stream(tags.split(",")).map(String::trim).filter(s->!s.isEmpty()).toList();
    return policyService.searchPolicies(query, tagNames, page, size, sort);
  }

  // === 관리자용(선택) ===
  @PostMapping("/policies")
  public Long create(@RequestBody PolicyUpsertRequest req) {
    Information i = req.toEntity();
    return policyService.createPolicy(i, req.tags());
  }

  @PutMapping("/policies/{id}")
  public void update(@PathVariable Long id, @RequestBody PolicyUpsertRequest req) {
    Information i = req.toEntity(); i.setInformationId(id);
    policyService.updatePolicy(i, req.tags());
  }

  @DeleteMapping("/policies/{id}")
  public void delete(@PathVariable Long id) { policyService.deletePolicy(id); }

  // 요청 DTO (컨트롤러 내부 static class로 간단히)
  public record PolicyUpsertRequest(
      String title, String content, String startDay, String endDay,
      String imageUrl, String linkUrl, List<String> tags
  ){
    public Information toEntity(){
      Information i = new Information();
      i.setInformationTitle(title);
      i.setInformationContent(content);
      i.setStartDay(java.time.LocalDate.parse(startDay));
      i.setEndDay(java.time.LocalDate.parse(endDay));
      i.setImageUrl(imageUrl);
      i.setLinkUrl(linkUrl);
      return i;
    }
  }
}

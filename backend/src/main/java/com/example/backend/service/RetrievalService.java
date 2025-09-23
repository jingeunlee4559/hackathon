package com.example.backend.service;

import java.util.*;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.backend.mapper.FaqMapper;
import com.example.backend.model.FaqItem;

@Service 
@RequiredArgsConstructor
public class RetrievalService {
  private final FaqMapper faq;

  public List<FaqItem> topK(String query, int k) {
    List<FaqItem> pool = (query!=null && !query.isBlank())
        ? faq.search(query, k * 3) : faq.findAll(k * 3);
    if (pool.isEmpty()) return pool;

    // 간단 랭킹(토큰 교집합 수 + 제목 보정) — 경량 (추정)
    Set<String> qTok = tokenize(query);
    return pool.stream()
      .sorted((a,b) -> Double.compare(score(b, qTok), score(a, qTok)))
      .limit(k).toList();
  }

  private double score(FaqItem f, Set<String> qTok) {
    String t = ((f.getTitle()==null?"":f.getTitle())+" "+(f.getContent()==null?"":f.getContent())).toLowerCase();
    long inter = qTok.stream().filter(t::contains).count();
    boolean titleHit = (f.getTitle()!=null) && qTok.stream().anyMatch(s -> f.getTitle().toLowerCase().contains(s));
    return inter + (titleHit?1.5:0);
  }
  private Set<String> tokenize(String s){
    if (s==null) return Set.of();
    return Arrays.stream(s.toLowerCase().split("[^가-힣a-z0-9]+"))
      .filter(w -> w.length()>=2).collect(java.util.stream.Collectors.toSet());
  }
}

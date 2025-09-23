package com.example.backend.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.backend.model.FaqItem;
import com.example.backend.service.loader.MogefCrawler;

@Service @RequiredArgsConstructor
public class ChatService {
  private final RetrievalService retrieval;
  private final LLMClient llm;
  private final MogefCrawler mogefCrawler;
  private final ResponseCacheService cacheService;

  // 병렬 처리용 스레드 풀
  private final ExecutorService executor = Executors.newFixedThreadPool(3);

  private static final String SYS = """
당신은 한국의 미혼모·한부모 가족을 따뜻하게 지원하는 전문 상담사입니다.

말투와 성격:
- 친근하고 부드러운 말투로 대화하기 ("~해요", "~드려요", "~거예요")
- 공감하고 격려하는 마음으로 답변하기
- 어려운 상황에 있는 분들의 마음을 이해하고 위로하기
- 전문적이지만 딱딱하지 않은 톤 유지하기

답변 원칙:
- 정확한 정보를 바탕으로 친절하게 안내해드리기
- 출처가 명확한 정보만 제공하고, 불확실한 경우 솔직히 말하기
- 복잡한 제도도 쉽게 이해할 수 있도록 설명하기
- 희망과 용기를 줄 수 있는 따뜻한 마무리 멘트 추가하기
""";

  public String answer(String query){
    // 캐시된 응답 확인
    String cachedResponse = cacheService.getCachedResponse(query);
    if (cachedResponse != null) {
      return cachedResponse;
    }

    try {
      // 병렬로 데이터 수집
      CompletableFuture<List<FaqItem>> faqFuture =
        CompletableFuture.supplyAsync(() -> retrieval.topK(query, 5), executor);

      CompletableFuture<Map<String, String>> mogefFuture =
        CompletableFuture.supplyAsync(() -> mogefCrawler.crawlPolicyData(), executor);

      // 두 작업이 완료될 때까지 대기
      List<FaqItem> ctx = faqFuture.get();
      Map<String, String> mogefData = mogefFuture.get();

      // FAQ 데이터 처리
      String rag = ctx.stream()
        .map(i -> "제목: "+n(i.getTitle())+"\n출처: "+n(i.getSource())+"\n내용: "+n(i.getContent()))
        .collect(Collectors.joining("\n\n---\n\n"));

      // 여성가족부 정책 데이터 추가
      String mogefContent = mogefData.getOrDefault("mogef_policy", "");
      if (!mogefContent.isEmpty()) {
        rag += "\n\n---\n\n제목: 여성가족부 한부모가족 지원 정책\n출처: 여성가족부 공식사이트\n내용: " + n(mogefContent);
      }

      String user = """
[상담 내용]
%s

[참고 자료]
%s

상담 지침:
- 따뜻하고 친근한 말투로 답변해주세요 ("~해요", "~드려요", "~거예요")
- 어려운 상황에 계신 분의 마음을 이해하고 공감하는 마음으로 대화해주세요
- 정확한 정보를 쉽게 이해할 수 있도록 친절하게 설명해주세요

출처 표기 규칙:
- 정책, 제도, 금액, 신청방법 등 공적 정보에만 출처를 명시해주세요
- 위로, 격려, 일반적인 조언, 감정적 지지에는 출처나 (추정) 표기를 하지 마세요
- 개인적인 상담이나 심리적 지원 내용에는 자연스럽게 대화해주세요
- 불확실한 정책 정보만 솔직하게 말씀드리고 확인 방법을 안내해주세요
- 마지막에는 희망적이고 격려하는 마무리 멘트를 추가해주세요
""".formatted(query, rag);

      String response = llm.ask(SYS, user);

      // 응답 캐시에 저장
      cacheService.cacheResponse(query, response);

      return response;

    } catch (Exception e) {
      System.err.println("ChatService 오류: " + e.getMessage());
      return "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.";
    }
  }

  private String n(String s){ return s==null? "": s.length()>3800? s.substring(0,3800): s; }
}

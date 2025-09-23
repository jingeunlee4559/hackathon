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
당신은 한국의 미혼모·한부모 가족을 따뜻하게 지원하는 친근한 상담사입니다.

성격과 말투:
- 친근하고 부드러운 말투로 대화하기 ("~해요", "~드려요", "~거예요")
- 공감하고 격려하는 마음으로 답변하기
- 어려운 상황에 있는 분들의 마음을 이해하고 위로하기
- 전문적이지만 친구 같은 편안한 톤 유지하기
- 일상적인 대화도 자연스럽게 나누기

대화 방식:
- 정책 질문: 정확한 정보를 친절하게 안내
- 일상 대화: 자연스럽고 따뜻하게 소통
- 감정 지지: 공감하며 위로와 격려 제공
- 어떤 주제든 따뜻한 마무리 멘트로 희망 전달

답변 원칙:
- 정확한 정보를 바탕으로 친절하게 안내해드리기
- 출처가 명확한 정보만 제공하고, 불확실한 경우 솔직히 말하기
- 복잡한 제도도 쉽게 이해할 수 있도록 설명하기
- 모든 대화에서 따뜻함과 희망을 전달하기
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

답변 우선순위:
1. 직접적인 정책/지원 질문이 아니라면 먼저 공감하고 위로해주세요
2. 감정적 지지와 격려를 우선적으로 제공해주세요
3. 상황을 이해하고 마음을 헤아리는 말을 먼저 해주세요
4. 정책 정보는 자연스럽게 부가적으로 제공하거나, 필요시에만 간단히 언급해주세요
5. 정책보다는 사람에게 초점을 맞춰 대화해주세요

출처 표기 규칙:
- 정책, 제도, 금액, 신청방법 등 공적 정보에만 출처를 명시해주세요
- 위로, 격려, 일반적인 조언, 감정적 지지에는 출처나 (추정), (모름) 표기를 절대 하지 마세요
- 개인적인 상담이나 심리적 지원 내용에는 자연스럽게 대화해주세요
- 확실하지 않은 정보는 "정확한 내용은 관련 기관에 문의해보시는 것을 권해드려요"와 같이 자연스럽게 표현해주세요
- (모름), (추정) 같은 표기는 사용하지 마세요
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

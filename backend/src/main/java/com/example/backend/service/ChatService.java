package com.example.backend.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.backend.model.FaqItem;

@Service @RequiredArgsConstructor
public class ChatService {
  private final RetrievalService retrieval;
  private final LLMClient llm;

  private static final String SYS = """
당신은 한국의 미혼모·한부모 지원 제도를 정확히 안내하는 상담 챗봇이다.
원칙:
- 사실 기반. 근거와 공적 출처를 함께 명시.
- 모르는 건 "모름"으로 답하고, 불확실/추정은 '추정'으로 표시.
- 개조식, 돌려 말하지 않기.
- 예산/금액 등은 반드시 '출처' 인용.
""";

  public String answer(String query){
    List<FaqItem> ctx = retrieval.topK(query, 5);
    String rag = ctx.stream()
      .map(i -> "제목: "+n(i.getTitle())+"\n출처: "+n(i.getSource())+"\n내용: "+n(i.getContent()))
      .collect(Collectors.joining("\n\n---\n\n"));

    String user = """
[사용자 질문]
%s

[검색 컨텍스트]
%s

지침:
- 질문 의도에 맞춰 핵심만 불릿으로.
- 각 불릿 문장 끝에 출처를 괄호로 표기.
- 불확실하면 (추정)으로 표기.
""".formatted(query, rag);

    return llm.ask(SYS, user);
  }

  private String n(String s){ return s==null? "": s.length()>3800? s.substring(0,3800): s; }
}

package com.example.backend.service.loader;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class MogefCrawler {

    private static final String MOGEF_URL = "https://www.mogef.go.kr/cs/opf/cs_opf_f072.do";

    // 캐시 (1시간마다 갱신)
    private Map<String, String> cachedData = null;
    private long lastCacheTime = 0;
    private static final long CACHE_DURATION = 60 * 60 * 1000; // 1시간

    public Map<String, String> crawlPolicyData() {
        // 캐시 체크
        long currentTime = System.currentTimeMillis();
        if (cachedData != null && (currentTime - lastCacheTime) < CACHE_DURATION) {
            return cachedData;
        }
        Map<String, String> policyData = new HashMap<>();

        try {
            Document document = Jsoup.connect(MOGEF_URL)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .timeout(10000)
                .get();

            // sub_cont div 찾기
            Element subCont = document.getElementById("sub_cont");
            if (subCont != null) {
                String content = extractPolicyContent(subCont);
                policyData.put("mogef_policy", content);
            }

        } catch (IOException e) {
            System.err.println("웹사이트 크롤링 오류: " + e.getMessage());

            // 크롤링 실패시 대체 데이터 제공
            policyData.put("mogef_policy", getFallbackPolicyData());
        }

        // 캐시 업데이트
        cachedData = policyData;
        lastCacheTime = currentTime;

        return policyData;
    }

    private String extractPolicyContent(Element element) {
        StringBuilder content = new StringBuilder();

        // 제목들 추출
        Elements titles = element.select("h1, h2, h3, h4, h5, h6");
        for (Element title : titles) {
            content.append("## ").append(title.text().trim()).append("\n\n");
        }

        // 본문 내용 추출
        Elements paragraphs = element.select("p, div.cont, div.text, li");
        for (Element p : paragraphs) {
            String text = p.text().trim();
            if (!text.isEmpty() && text.length() > 10) {
                content.append(text).append("\n\n");
            }
        }

        // 표 데이터 추출
        Elements tables = element.select("table");
        for (Element table : tables) {
            content.append("### 정책 상세 정보\n");
            Elements rows = table.select("tr");
            for (Element row : rows) {
                Elements cells = row.select("td, th");
                for (Element cell : cells) {
                    content.append(cell.text().trim()).append(" | ");
                }
                content.append("\n");
            }
            content.append("\n");
        }

        return content.toString();
    }

    private String getFallbackPolicyData() {
        return """
        ## 한부모가족 지원 정책 (여성가족부)

        ### 출생신고 지원
        - 2021년 3월부터 미혼부의 자녀 출생신고 절차가 간소화되었습니다.
        - 어머니의 행방불명, 서류 제공 거부, 신상 파악 불가 시에도 출생신고 가능합니다.

        ### 주요 지원 서비스

        #### 1. 아동양육비 지원
        - 월 21만원~40만원 (소득수준 및 아동 연령에 따라 차등 지원)
        - 신청일로부터 소급 지급 가능

        #### 2. 보육료 지원
        - 어린이집 이용: 월 28만원~54만원 (아동 연령별 차등)
        - 가정양육수당: 월 10만원 (어린이집 미이용 시)

        #### 3. 아동수당
        - 만 8세 미만 아동 월 10만원
        - 소급 지급 가능

        #### 4. 건강보험
        - 정식 출생신고 전에도 아동 건강보험 가입 가능
        - 유전자검사 결과서, 출생증명서 등 필요

        ### 상담 및 지원 기관
        - 법률구조공단: ☎132
        - 한부모가족 상담전화: ☎1577-4206

        ### 신청 방법
        - 거주지 주민센터 방문 신청
        - 온라인 복지로(www.bokjiro.go.kr) 신청
        - 필요서류: 신분증, 가족관계증명서, 소득증명서 등
        """;
    }
}
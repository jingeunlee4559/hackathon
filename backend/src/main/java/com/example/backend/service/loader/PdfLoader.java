// backend/src/main/java/com/example/backend/service/loader/PdfLoader.java
package com.example.backend.service.loader;

import com.example.backend.mapper.FaqMapper;
import com.example.backend.model.FaqItem;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PdfLoader {
  private final FaqMapper faq;
  private final ResourceLoader resourceLoader;

  public int load(String path, String sourceName) throws Exception {
    int count = 0;
    var res = resourceLoader.getResource(path);      // "file:/..." 또는 "classpath:..."
    try (var is = res.getInputStream();
         var doc = PDDocument.load(is)) {
      String all = new PDFTextStripper().getText(doc);

      for (String chunk : all.split("\\n\\s*\\n")) { // 아주 단순한 청킹
        String text = chunk.trim();
        if (text.length() < 200) continue;
        FaqItem item = FaqItem.builder()
            .title(guessTitle(text))
            .content(text.length() > 3800 ? text.substring(0, 3800) : text)
            .source("pdf:" + sourceName)
            .tags(guessTags(text))
            .build();
        faq.insert(item);
        if (++count >= 200) break; // 과적재 방지(필요시 조정)
      }
    }
    return count;
  }

  private String guessTitle(String t){
    String[] lines = t.split("\\n");
    return lines.length > 0 ? lines[0].replaceAll("\\s+"," ").trim() : "PDF 항목";
  }
  private String guessTags(String t){
    String[] keys = {"임신","출산","양육비","보육","주거","법률","긴급","바우처","첫만남이용권"};
    StringBuilder sb = new StringBuilder();
    for (String k : keys) if (t.contains(k)) { if (sb.length()>0) sb.append(','); sb.append(k); }
    return sb.toString();
  }
}

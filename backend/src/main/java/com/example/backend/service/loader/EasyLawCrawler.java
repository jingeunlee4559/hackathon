package com.example.backend.service.loader;

import com.example.backend.mapper.FaqMapper;
import com.example.backend.model.FaqItem;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class EasyLawCrawler {
  private final FaqMapper faq;

  public int crawlOvDivbox(String url) throws Exception {
    Document doc = Jsoup.connect(url).get();
    String text = doc.select("div.ovDivbox").text().trim(); // 지정된 섹션만
    if (text.isEmpty()) return 0;
    FaqItem item = FaqItem.builder()
      .title("EasyLaw ovDivbox")
      .content(text.length()>3800? text.substring(0,3800): text)
      .source(url)
      .tags("법률정보,EasyLaw")
      .build();
    faq.insert(item);
    return 1;
  }
}

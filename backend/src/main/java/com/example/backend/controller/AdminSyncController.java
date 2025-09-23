package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.example.backend.service.loader.PdfLoader;
import com.example.backend.service.loader.EasyLawCrawler;

@RestController @RequestMapping("/api/admin") @RequiredArgsConstructor
public class AdminSyncController {
  private final PdfLoader pdf;
  private final EasyLawCrawler crawler;

  @PostMapping("/sync/pdf")
  public String loadPdf(@RequestParam String path, @RequestParam(defaultValue="hack.pdf") String source) throws Exception {
    int n = pdf.load(path, source);
    return "PDF chunks="+n;
  }

  @PostMapping("/sync/easylaw")
  public String syncEasyLaw(@RequestParam String url) throws Exception {
    int n = crawler.crawlOvDivbox(url);
    return "easylaw items="+n;
  }
}

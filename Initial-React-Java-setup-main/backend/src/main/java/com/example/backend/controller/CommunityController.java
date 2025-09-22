package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.service.CommunityServicempl;

@Controller
public class CommunityController {
    
@Autowired
private CommunityServicempl service;

    @RequestMapping("/community")
    public void community(){}


}

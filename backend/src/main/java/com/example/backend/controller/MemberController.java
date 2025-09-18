package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.model.Member;
import com.example.backend.service.MemberService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class MemberController {

    
    @Autowired
    private MemberService memberService;

    @GetMapping("/allmember")
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    
    }


}
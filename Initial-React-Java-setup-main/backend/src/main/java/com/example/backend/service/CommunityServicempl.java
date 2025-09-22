package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.backend.model.Community;

@Service
public class CommunityServicempl implements CommunityService {

    @Override
    public String list(Model model) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'list'");
    }

    @Override
    public String insert(Community vo) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insert'");
    }

    @Override
    public String delete(Long communityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public String updatePage(Long communityId, Model model) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updatePage'");
    }

    @Override
    public String update(Long viewCount, Long communityId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

}

package com.example.backend.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.backend.mapper.TagMapper;
import com.example.backend.model.Tag;
import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class TagService {
  private final TagMapper tagMapper;
  public List<Tag> getAll() { return tagMapper.findAll(); }
}

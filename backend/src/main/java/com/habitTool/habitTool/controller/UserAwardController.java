package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.UserAwardDto;
import com.habitTool.habitTool.service.UserAwardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userAwards")
@RequiredArgsConstructor
public class UserAwardController {
    private final UserAwardService userAwardService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserAwardDto>> getAllByUser(
            @PathVariable(name = "userId") Long userId
    ){
        List<UserAwardDto> list = userAwardService.getByUser(userId);
        return ResponseEntity.ok().body(list);
    }
}

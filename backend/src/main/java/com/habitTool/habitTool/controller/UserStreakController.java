package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.UserStreakDto;
import com.habitTool.habitTool.service.UserStreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/streaks")
@RequiredArgsConstructor
public class UserStreakController {

    private final UserStreakService userStreakService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserStreakDto> calculateForUser(@PathVariable(name = "userId") Long userId) {
        UserStreakDto streak = userStreakService.calculateForUser(userId);
        return ResponseEntity.ok(streak);
    }
}
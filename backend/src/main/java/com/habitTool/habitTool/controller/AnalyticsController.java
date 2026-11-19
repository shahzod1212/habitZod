package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.AnalyticsDto;
import com.habitTool.habitTool.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private   final AnalyticsService analyticsService;

    @GetMapping("/{userId}")
    public ResponseEntity<AnalyticsDto> analyze(
            @PathVariable(name = "userId") Long userId
    ){
        AnalyticsDto analyticsDto = analyticsService.analyzeHabit(userId);
        return ResponseEntity.ok(analyticsDto);
    }
}

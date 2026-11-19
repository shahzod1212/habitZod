package com.habitTool.habitTool.service;

import com.habitTool.habitTool.dtos.AnalyticsDto;

public interface AnalyticsService {

    AnalyticsDto analyzeHabit(Long userId);
}

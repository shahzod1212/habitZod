package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HabitRequest {
    private String title;
    private String description;
    private String category;
    private HabitFrequency frequency;
    private Integer targetCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime reminder;
    private HabitDifficulty difficulty;
    private String iconUrl;
    private Long userId;
}

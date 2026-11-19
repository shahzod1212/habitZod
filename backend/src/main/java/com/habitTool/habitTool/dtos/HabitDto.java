package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import com.habitTool.habitTool.domain.enums.HabitStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HabitDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private HabitFrequency frequency;
    private Integer targetCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime reminder;
    private HabitDifficulty difficulty;
    private Integer completedRate;
    private String iconUrl;
    private Long userId;
    private HabitStatus status;
}

package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.Habit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsDto {
    private Long id;
    private Long userId;
    private List<LocalDate> dateCompleted;
    private List<LocalDate> missedDates;
    private Double completionRate;
    private Integer completedHabits;
    private Integer missedHabits;
    private Integer totalHabits;
}

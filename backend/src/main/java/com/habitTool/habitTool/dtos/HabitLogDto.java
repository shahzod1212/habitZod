package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.enums.HabitStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HabitLogDto {
    private Long id;
    private Long habitId;
    private LocalDate date;
    private HabitStatus status;
}

package com.habitTool.habitTool.service;

import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import com.habitTool.habitTool.dtos.HabitDto;
import com.habitTool.habitTool.dtos.HabitRequest;
import org.springframework.data.domain.Page;

import java.time.LocalDate;

public interface HabitService {

    HabitDto createHabit(HabitRequest habitRequest);

    HabitDto updateHabit(Long id, HabitRequest habitRequest);

    void deleteHabit(Long id);

    HabitDto getHabitById(Long id);

    Page<HabitDto> getHabitsByUserId(Long userId, int page, int size);

    Page<HabitDto> getHabitsByFrequency(String frequency, int page, int size);

    Page<HabitDto> getHabitsByStartDate(String startDate, int page, int size);

    Page<HabitDto> getHabitsByEndDate(String endDate, int page, int size);

    Page<HabitDto> getHabitsByCategory(String category, int page, int size);

    Page<HabitDto> getHabitsByDifficulty(String difficulty, int page, int size);

    Page<HabitDto> searchHabitsByTitle(String title, int page, int size);

    Integer count(Long userId);
}
package com.habitTool.habitTool.service;

import com.habitTool.habitTool.domain.HabitLog;
import com.habitTool.habitTool.dtos.HabitLogDto;
import com.habitTool.habitTool.dtos.HabitLogRequest;

import java.util.List;

public interface HabitLogService {
    HabitLogDto create(HabitLogRequest habitLogRequest);

    List<HabitLogDto> getAllHabitsOfUser(Long habitId);
    HabitLogDto getHabitByDateAndId(Long habitLogId, String date);

    HabitLogDto changeStatus(Long habitLogId,String date,String status);

}

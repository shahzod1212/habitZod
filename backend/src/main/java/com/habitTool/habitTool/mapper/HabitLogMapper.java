package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.HabitLog;
import com.habitTool.habitTool.dtos.HabitDto;
import com.habitTool.habitTool.dtos.HabitLogDto;
import com.habitTool.habitTool.dtos.HabitLogRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HabitLogMapper {
    HabitLog toEntity(HabitLogRequest habitLogRequest);

    @Mapping(target = "habitId", source = "habit.id")
    HabitLogDto toDto(HabitLog habitLog);
}

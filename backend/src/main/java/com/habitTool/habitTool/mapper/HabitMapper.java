package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.dtos.HabitDto;
import com.habitTool.habitTool.dtos.HabitRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HabitMapper {
    Habit toEntity(HabitRequest habitRequest);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "status", source = "status")
    @Mapping(target = "completedRate", source = "completedRate")
    HabitDto toDto(Habit habit);
}

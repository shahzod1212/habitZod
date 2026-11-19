package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.UserStreak;
import com.habitTool.habitTool.dtos.UserStreakDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserStreakMapper {

    UserStreakDto toDto(UserStreak userStreak);
}

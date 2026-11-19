package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.Analytics;
import com.habitTool.habitTool.dtos.AnalyticsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnalyticsMapper {


    @Mapping(target = "userId", source = "user.id")
    AnalyticsDto toDto(Analytics analytics);
}

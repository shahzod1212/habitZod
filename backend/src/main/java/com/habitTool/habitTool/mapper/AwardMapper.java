package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.Awards;
import com.habitTool.habitTool.dtos.AwardRequest;
import com.habitTool.habitTool.dtos.AwardsDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AwardMapper {

    Awards toEntity(AwardRequest awardRequest);

    AwardsDto toDto(Awards awards);
}

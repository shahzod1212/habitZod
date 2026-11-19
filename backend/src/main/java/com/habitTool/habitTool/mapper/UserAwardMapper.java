package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.UserAward;
import com.habitTool.habitTool.dtos.UserAwardDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserAwardMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "awardId", source = "awards.id")
    UserAwardDto toDto(UserAward userAward);
}

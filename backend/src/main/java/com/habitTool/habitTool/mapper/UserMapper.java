package com.habitTool.habitTool.mapper;

import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.dtos.LoginUserRequest;
import com.habitTool.habitTool.dtos.UserDto;
import com.habitTool.habitTool.dtos.UserRegisterRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserRegisterRequest userRegisterRequest);

    User toEntity(LoginUserRequest loginUserRequest);

    UserDto toDto(User user);
}

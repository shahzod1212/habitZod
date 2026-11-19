package com.habitTool.habitTool.service;

import com.habitTool.habitTool.dtos.AuthDto;
import com.habitTool.habitTool.dtos.LoginUserRequest;
import com.habitTool.habitTool.dtos.UserDto;
import com.habitTool.habitTool.dtos.UserRegisterRequest;

public interface UserService {

    AuthDto registerUser(UserRegisterRequest userRegisterRequest);

    AuthDto loginUser(LoginUserRequest loginUserRequest);

    AuthDto refreshAccessToken(String token);

    UserDto changeStatus(Long id,String token);
}

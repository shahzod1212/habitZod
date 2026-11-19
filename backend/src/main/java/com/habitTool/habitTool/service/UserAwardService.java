package com.habitTool.habitTool.service;

import com.habitTool.habitTool.dtos.UserAwardDto;

import java.util.List;

public interface UserAwardService {
    UserAwardDto create(Long userId, Long awardId);

    List<UserAwardDto> getByUser(Long userId);
}

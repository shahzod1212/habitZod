package com.habitTool.habitTool.service;

import com.habitTool.habitTool.dtos.UserStreakDto;

public interface UserStreakService {
    UserStreakDto calculateForUser(Long userId);

}

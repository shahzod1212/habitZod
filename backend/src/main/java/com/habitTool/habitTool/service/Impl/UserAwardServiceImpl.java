package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Awards;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.UserAward;
import com.habitTool.habitTool.dtos.UserAwardDto;
import com.habitTool.habitTool.exception.UserNotFoundException;
import com.habitTool.habitTool.mapper.UserAwardMapper;
import com.habitTool.habitTool.repository.AwardsRepository;
import com.habitTool.habitTool.repository.UserAwardRepository;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.service.UserAwardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAwardServiceImpl implements UserAwardService {
    private final  UserAwardMapper userAwardMapper;
    private final UserAwardRepository userAwardRepository;
    private final UserRepository userRepository;
    private final AwardsRepository awardsRepository;
    @Override
    public UserAwardDto create(Long userId, Long awardId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new UserNotFoundException("User not found"));
        Awards awards = awardsRepository.findById(awardId)
                .orElseThrow(()->new UserNotFoundException("Award not found"));

        UserAward userAward = new UserAward();
        userAward.setUser(user);
        userAward.setAwards(awards);
        UserAward saved = userAwardRepository.save(userAward);
        return userAwardMapper.toDto(saved);
    }

    @Override
    public List<UserAwardDto> getByUser(Long userId) {
        return userAwardRepository.findByUserId(userId)
                .stream()
                .map(userAwardMapper::toDto)
                .toList();
    }
}

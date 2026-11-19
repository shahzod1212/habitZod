package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Analytics;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.UserStreak;
import com.habitTool.habitTool.dtos.UserStreakDto;
import com.habitTool.habitTool.event.AchievementCheckEvent;
import com.habitTool.habitTool.exception.UserNotFoundException;
import com.habitTool.habitTool.mapper.UserStreakMapper;
import com.habitTool.habitTool.repository.AnalyticsRepository;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.repository.UserStreakRepository;
import com.habitTool.habitTool.service.UserStreakService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserStreakServiceImpl implements UserStreakService {
    private final UserStreakRepository userStreakRepository;
    private final UserStreakMapper userStreakMapper;
    private final UserRepository userRepository;
    private final AnalyticsRepository analyticsRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    public UserStreakDto calculateForUser(Long userId) {
        UserStreak streak = new UserStreak();

        Optional<Analytics> analytics = analyticsRepository.findByUserId(userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (analytics.isEmpty()) {
            throw new UserNotFoundException("Please register to start you journey");
        }

        List<LocalDate> completedDates = analytics.get().getDateCompleted();

        if (completedDates == null || completedDates.isEmpty()) {
            throw new UserNotFoundException("No completed habits yet to calculate a streak");
        }

        completedDates.sort(LocalDate::compareTo);

        int current = 1;
        int longest = 1;

        for (int i = 0; i < completedDates.size() - 1; i++) {

            LocalDate today = completedDates.get(i);
            LocalDate next = completedDates.get(i + 1);

            if (next.equals(today.plusDays(1))) {
                current++;
            } else {
                longest = Math.max(longest, current);
                current = 1;
            }
        }

        longest = Math.max(longest, current);

        streak.setCurrentStreak(current);
        streak.setLongestStreak(longest);
        streak.setUser(user);

        UserStreak saved = userStreakRepository.save(streak);

        applicationEventPublisher.publishEvent(
                new AchievementCheckEvent(userId)
        );
        return userStreakMapper.toDto(saved);
    }
}
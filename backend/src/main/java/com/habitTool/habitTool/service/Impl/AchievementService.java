package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Analytics;
import com.habitTool.habitTool.domain.Awards;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.UserAward;
import com.habitTool.habitTool.domain.UserStreak;
import com.habitTool.habitTool.repository.AnalyticsRepository;
import com.habitTool.habitTool.repository.AwardsRepository;
import com.habitTool.habitTool.repository.UserAwardRepository;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.repository.UserStreakRepository;
import com.habitTool.habitTool.service.UserAwardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final UserRepository userRepository;
    private final UserStreakRepository streakRepository;
    private final AnalyticsRepository analyticsRepository;
    private final AwardsRepository awardsRepository;
    private final UserAwardRepository userAwardRepository;
    private final UserAwardService userAwardService;

    public void check(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        UserStreak streak = streakRepository.findByUserId(userId);

        Optional<Analytics> analytics = analyticsRepository.findByUserId(userId);

        if (streak == null || analytics.isEmpty()) {
            return;
        }

        if (streak.getLongestStreak() == 1) {
            giveAward(user, "FIRST_STEP");
        }

        if (streak.getLongestStreak() == 7) {
            giveAward(user, "STREAK_7");
        }

        if (streak.getLongestStreak() == 14) {
            giveAward(user, "CONSISTENCY_14");
        }

        if (streak.getLongestStreak() == 30) {
            giveAward(user, "STREAK_30");
        }

        if (analytics.get().getCompletedHabits() == 100) {
            giveAward(user, "COMPLETE_100");
        }
    }

    private void giveAward(User user, String awardCode) {

        Awards award = awardsRepository.findByCode(awardCode);

        if (award == null) {
            return;
        }

        if (userAwardRepository.existsByUserAndAwards(user, award)) {
            return;
        }
        userAwardService.create(user.getId(), award.getId());


    }
}
package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Analytics;
import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.domain.HabitLog;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.enums.HabitStatus;
import com.habitTool.habitTool.dtos.AnalyticsDto;
import com.habitTool.habitTool.exception.UserNotFoundException;
import com.habitTool.habitTool.mapper.AnalyticsMapper;
import com.habitTool.habitTool.repository.AnalyticsRepository;
import com.habitTool.habitTool.repository.HabitLogRepository;
import com.habitTool.habitTool.repository.HabitRepository;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {
    private final AnalyticsMapper analyticsMapper;
    private final AnalyticsRepository analyticsRepository;
    private final HabitRepository habitRepository;
    private final HabitLogRepository habitLogRepository;
    private final UserRepository userRepository;

    @Override
    public AnalyticsDto analyzeHabit(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Analytics analytics = analyticsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Analytics newAnalytics = new Analytics();
                    newAnalytics.setUser(user);
                    return newAnalytics;
                });

        List<Habit> list = habitRepository.findByUserId(userId);
        List<HabitLog> listOfLogs = new ArrayList<>();
        List<LocalDate> completedDates = new ArrayList<>();
        List<LocalDate> missedDate = new ArrayList<>();
        List<Habit> completed = new ArrayList<>();

        for (Habit habit : list) {
            listOfLogs.addAll(habitLogRepository.findByHabitId(habit.getId()));

            if (habit.getStatus().equals(HabitStatus.COMPLETED)) {
                completed.add(habit);
            }
        }
        for (HabitLog habitLog : listOfLogs) {
            if (habitLog.getStatus().equals(HabitStatus.COMPLETED)) {
                completedDates.add(habitLog.getDate());
            } else {
                missedDate.add(habitLog.getDate());
            }
        }

        Double completedRate = list.isEmpty()
                ? 0.0
                : (double) completed.size() * 100 / list.size();
        int missedHabits = list.size() - completed.size();

        analytics.setCompletedHabits(completed.size());
        analytics.setMissedHabits(missedHabits);
        analytics.setTotalHabits(list.size());
        analytics.setDateCompleted(completedDates);
        analytics.setMissedDates(missedDate);
        analytics.setCompletionRate(completedRate);

        Analytics saved = analyticsRepository.save(analytics);
        return analyticsMapper.toDto(saved);
    }
}
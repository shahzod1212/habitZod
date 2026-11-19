package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.domain.HabitLog;
import com.habitTool.habitTool.domain.enums.HabitStatus;
import com.habitTool.habitTool.dtos.HabitLogDto;
import com.habitTool.habitTool.dtos.HabitLogRequest;
import com.habitTool.habitTool.mapper.HabitLogMapper;
import com.habitTool.habitTool.repository.HabitLogRepository;
import com.habitTool.habitTool.repository.HabitRepository;
import com.habitTool.habitTool.service.HabitLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitLogServiceImpl implements HabitLogService {

    private final HabitLogMapper habitLogMapper;
    private final HabitLogRepository habitLogRepository;
    private final HabitRepository habitRepository;
    private final RedisService redisService;

    @Override
    public HabitLogDto create(HabitLogRequest habitLogRequest) {
        HabitLog habitLog = habitLogMapper.toEntity(habitLogRequest);
        habitLog.setStatus(HabitStatus.NONE);

        HabitLog saved = habitLogRepository.save(habitLog);

        return habitLogMapper.toDto(saved);
    }

    @Override
    public List<HabitLogDto> getAllHabitsOfUser(Long habitId) {
        return habitLogRepository.findByHabitId(habitId)
                .stream()
                .map(habitLogMapper::toDto)
                .toList();
    }

    @Override
    public HabitLogDto getHabitByDateAndId(Long habitLogId, String date) {
        LocalDate localDate = LocalDate.parse(date);

        HabitLog habitLog = habitLogRepository
                .findByIdAndDate(habitLogId, localDate);

        return habitLogMapper.toDto(habitLog);
    }

    @Override
    public HabitLogDto changeStatus(Long habitLogId, String date, String status) {

        LocalDate localDate = LocalDate.parse(date);

        HabitLog habitLog = habitLogRepository
                .findByIdAndDate(habitLogId, localDate);

        Habit habit = habitLog.getHabit();

        if (LocalDate.now().isAfter(habit.getEndDate())) {
            habit.setStatus(HabitStatus.COMPLETED);
            habitRepository.save(habit);
            throw new RuntimeException("Habit has ended. Status can no longer be changed.");
        }

        HabitStatus newStatus = HabitStatus.valueOf(status.toUpperCase());
        HabitStatus oldStatus = habitLog.getStatus();

        habitLog.setStatus(newStatus);

        List<HabitLog> logs = habitLogRepository.findByHabitId(habit.getId());

        long completedCount = logs.stream()
                .filter(log -> log.getStatus() == HabitStatus.COMPLETED)
                .count();

        if (logs.isEmpty()) {
            habit.setCompletedRate(0);
            habit.setStatus(HabitStatus.NONE);
        } else {

            if (newStatus == HabitStatus.COMPLETED && oldStatus != HabitStatus.COMPLETED) {
                completedCount++;

                String userKey = "user:" + habit.getUser().getId();
                String habitKey = "habit:" + habit.getId();

                redisService.increment(userKey + ":completedCount");
                redisService.increment(habitKey + ":completedCount");
            }

            double rate = (completedCount * 100.0) / logs.size();
            habit.setCompletedRate((int) rate);

            if (completedCount == logs.size()) {
                habit.setStatus(HabitStatus.COMPLETED);
            } else if (completedCount > 0) {
                habit.setStatus(HabitStatus.IN_PROGRESS);
            } else {
                habit.setStatus(HabitStatus.NONE);
            }
        }

        if (newStatus == HabitStatus.COMPLETED && oldStatus != HabitStatus.COMPLETED) {

            String streakKey = "habit:" + habit.getId() + ":streak";

            LocalDate lastCompleted = habit.getLastCompletedDate();

            if (lastCompleted == null) {
                redisService.set(streakKey, 1);
                habit.setStreak(1);
            } else if (lastCompleted.plusDays(1).equals(localDate)) {
                redisService.increment(streakKey);
                habit.setStreak(habit.getStreak() + 1);
            } else {
                redisService.set(streakKey, 1);
                habit.setStreak(1);
            }

            habit.setLastCompletedDate(localDate);
        }

        habitRepository.save(habit);
        HabitLog saved = habitLogRepository.save(habitLog);

        return habitLogMapper.toDto(saved);
    }
}
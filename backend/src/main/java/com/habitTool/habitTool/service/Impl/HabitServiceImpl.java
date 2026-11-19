package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.domain.HabitLog;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import com.habitTool.habitTool.domain.enums.HabitStatus;
import com.habitTool.habitTool.dtos.HabitDto;
import com.habitTool.habitTool.dtos.HabitLogRequest;
import com.habitTool.habitTool.dtos.HabitRequest;
import com.habitTool.habitTool.exception.HabitAlreadyExistsException;
import com.habitTool.habitTool.exception.HabitNotFoundException;
import com.habitTool.habitTool.exception.UserNotFoundException;
import com.habitTool.habitTool.mapper.HabitMapper;
import com.habitTool.habitTool.repository.HabitLogRepository;
import com.habitTool.habitTool.repository.HabitRepository;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.service.HabitLogService;
import com.habitTool.habitTool.service.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitServiceImpl implements HabitService {

    private final HabitRepository habitRepository;
    private final HabitMapper habitMapper;
    private final UserRepository userRepository;
    private final HabitLogService habitLogService;
    private final HabitLogRepository habitLogRepository;

    @Override
    public HabitDto createHabit(HabitRequest habitRequest) {

        Habit habit = habitMapper.toEntity(habitRequest);

        // check duplicate
        Habit existing = habitRepository
                .findByTitleAndUserId(habitRequest.getTitle(), habitRequest.getUserId())
                .orElse(null);

        if (existing != null) {
            throw new HabitAlreadyExistsException("Habit already exists for this user");
        }

        User user = userRepository.findById(habitRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        habit.setUser(user);
        habit.setStreak(1);
        habit.setCompletedRate(0);

        // set reminder
        habit.setNextReminder(
                LocalDateTime.of(
                        habitRequest.getStartDate(),
                        habitRequest.getReminder()
                )
        );

        habit.setStreak(0);
        habit.setStatus(HabitStatus.NONE);

        Habit saved = habitRepository.save(habit);

        // 🔥 GENERATE HABIT LOGS
        List<LocalDate> dates = generateDates(saved);

        for (LocalDate date : dates) {
            HabitLog log = HabitLog.builder()
                    .habit(saved)
                    .date(date)
                    .status(HabitStatus.NONE)
                    .build();

            habitLogRepository.save(log);
        }

        return habitMapper.toDto(saved);
    }

    // 🔥 CORE LOGIC: date generator
    private List<LocalDate> generateDates(Habit habit) {

        List<LocalDate> dates = new ArrayList<>();

        LocalDate current = habit.getStartDate();
        LocalDate end = habit.getEndDate();

        while (!current.isAfter(end)) {

            dates.add(current);

            current = switch (habit.getFrequency()) {

                case DAILY -> current.plusDays(1);

                case WEEKLY -> current.plusWeeks(1);

                case MONTHLY -> current.plusMonths(1);

                case CUSTOM -> current.plusDays(1);
            };
        }

        return dates;
    }

    @Override
    public HabitDto updateHabit(Long id, HabitRequest habitRequest) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new HabitNotFoundException("Habit not found"));

        User user = userRepository.findById(habitRequest.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        habit.setTitle(habitRequest.getTitle());
        habit.setDescription(habitRequest.getDescription());
        habit.setCategory(habitRequest.getCategory());
        habit.setFrequency(habitRequest.getFrequency());
        habit.setTargetCount(habitRequest.getTargetCount());
        habit.setStartDate(habitRequest.getStartDate());
        habit.setEndDate(habitRequest.getEndDate());
        habit.setReminder(habitRequest.getReminder());
        habit.setDifficulty(habitRequest.getDifficulty());
        habit.setIconUrl(habitRequest.getIconUrl());
        habit.setUser(user);

        Habit saved = habitRepository.save(habit);

        return habitMapper.toDto(saved);
    }

    @Override
    public void deleteHabit(Long id) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new HabitNotFoundException("Habit not found"));

        habitRepository.delete(habit);
    }

    @Override
    public HabitDto getHabitById(Long id) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new HabitNotFoundException("Habit not found"));

        return habitMapper.toDto(habit);
    }

    @Override
    public Page<HabitDto> getHabitsByUserId(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return habitRepository.findByUserId(userId, pageable)
                .map(habitMapper::toDto);
    }

    @Override
    public Page<HabitDto> getHabitsByFrequency(String frequency, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        HabitFrequency habitFrequency = HabitFrequency.valueOf(
                frequency.toUpperCase()
        );

        return habitRepository.findByFrequency(habitFrequency, pageable)
                .map(habitMapper::toDto);
    }

    @Override
    public Page<HabitDto> getHabitsByStartDate(String startDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        LocalDate parsedStartDate = LocalDate.parse(startDate);

        return habitRepository.findByStartDate(parsedStartDate, pageable)
                .map(habitMapper::toDto);
    }
    @Override
    public Page<HabitDto> getHabitsByEndDate(String endDate, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        LocalDate parsedEndDate = LocalDate.parse(endDate);

        return habitRepository.findByEndDate(parsedEndDate, pageable)
                .map(habitMapper::toDto);
    }


    @Override
    public Page<HabitDto> getHabitsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return habitRepository.findByCategory(category, pageable)
                .map(habitMapper::toDto);
    }

    @Override
    public Page<HabitDto> getHabitsByDifficulty(String difficulty, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        HabitDifficulty habitDifficulty = HabitDifficulty.valueOf(
                difficulty.toUpperCase()
        );

        return habitRepository.findByDifficulty(habitDifficulty, pageable)
                .map(habitMapper::toDto);
    }

    @Override
    public Page<HabitDto> searchHabitsByTitle(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return habitRepository.findByTitleContainingIgnoreCase(title, pageable)
                .map(habitMapper::toDto);
    }

    @Override
    public Integer count(Long userId) {
        return (int) habitRepository.countByUserId(userId);
    }
}
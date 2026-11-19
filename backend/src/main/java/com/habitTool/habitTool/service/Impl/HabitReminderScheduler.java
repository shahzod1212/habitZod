package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.repository.HabitRepository;
import com.habitTool.habitTool.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitReminderScheduler {

    private final HabitRepository habitRepository;
    private final EmailService emailService;

    @Scheduled(fixedRate = 1800000)
    public void sendReminders() {

        LocalDateTime now = LocalDateTime.now();

        List<Habit> dueHabits =
                habitRepository.findByNextReminderLessThanEqual(now);

        for (Habit habit : dueHabits) {

            // ✅ CALL YOUR EMAIL METHOD HERE
            emailService.sendEmailReminder(
                    habit.getUser().getEmail(),
                    habit
            );

            // 🔁 update next reminder after sending
            habit.setNextReminder(calculateNext(habit));

            habitRepository.save(habit);
        }
    }

    private LocalDateTime calculateNext(Habit habit) {

        LocalDateTime current = habit.getNextReminder();

        return switch (habit.getFrequency()) {

            case DAILY -> current.plusDays(1);

            case WEEKLY -> current.plusWeeks(1);

            case MONTHLY -> current.plusMonths(1);

            case CUSTOM -> current.plusDays(1); // adjust later
        };
    }
}
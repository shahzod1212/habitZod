package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {

    Page<Habit> findByFrequency(HabitFrequency frequency, Pageable pageable);

    Page<Habit> findByStartDate(LocalDate startDate, Pageable pageable);

    Page<Habit> findByEndDate(LocalDate endDate, Pageable pageable);

    Page<Habit> findByCategory(String category, Pageable pageable);

    Page<Habit> findByDifficulty(HabitDifficulty difficulty, Pageable pageable);

    Page<Habit> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<Habit> findByUserId(Long userId, Pageable pageable);

    Habit findByTitle(String title);

    List<Habit> findByNextReminderLessThanEqual(LocalDateTime time);

    Optional<Habit> findByTitleAndUserId(String title, Long userId);
    List<Habit> findByUserId(Long userId);
    long countByUserId(Long userId);

}
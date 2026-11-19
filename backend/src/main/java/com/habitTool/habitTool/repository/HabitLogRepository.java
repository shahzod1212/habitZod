package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.HabitLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HabitLogRepository extends JpaRepository<HabitLog, Long> {
    List<HabitLog> findByHabitId(Long habitId);
    HabitLog findByIdAndDate(Long Id, LocalDate date);
}

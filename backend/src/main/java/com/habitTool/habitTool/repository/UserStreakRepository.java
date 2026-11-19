package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.UserStreak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStreakRepository extends JpaRepository<UserStreak, Long> {
    UserStreak findByUserId(Long userId);
}

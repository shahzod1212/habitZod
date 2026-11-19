package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.Awards;
import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.UserAward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAwardRepository extends JpaRepository<UserAward, Long> {
    List<UserAward> findByUserId(Long userId);

    boolean existsByUserAndAwards(User user, Awards awards);
}

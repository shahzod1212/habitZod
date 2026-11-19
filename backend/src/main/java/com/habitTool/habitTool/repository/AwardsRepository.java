package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.Awards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AwardsRepository  extends JpaRepository<Awards, Long> {
    Awards findByCode(String code);
}

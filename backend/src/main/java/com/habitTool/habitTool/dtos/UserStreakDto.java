package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.User;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStreakDto {
    private Long id;
    private Long userId;
    private Integer currentStreak;
    private Integer longestStreak;
}

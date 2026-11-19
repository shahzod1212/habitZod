package com.habitTool.habitTool.domain;

import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import com.habitTool.habitTool.domain.enums.HabitStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;

    @Enumerated(EnumType.STRING)
    private HabitFrequency frequency;
    private Integer targetCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime reminder;
    @Enumerated(EnumType.STRING)
    private HabitDifficulty difficulty;
    private String iconUrl;
    @ManyToOne
    private User user;
    private LocalDateTime nextReminder;
    @CreatedDate
    private LocalDate createdAt;

    private int streak;

    private LocalDate lastCompletedDate;

    private HabitStatus status;
    @Column(name = "completed_rate")
    private Integer completedRate;

    @OneToMany(mappedBy = "habit", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<HabitLog> logs = new ArrayList<>();
}
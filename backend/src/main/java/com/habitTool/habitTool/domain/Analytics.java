package com.habitTool.habitTool.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User user;
    @ElementCollection
    private List<LocalDate> dateCompleted;
    @ElementCollection
    private List<LocalDate> missedDates;
    private Double completionRate;
    private Integer completedHabits;
    private Integer missedHabits;
    private Integer totalHabits;


}

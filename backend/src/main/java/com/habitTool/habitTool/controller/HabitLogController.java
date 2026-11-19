package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.HabitLogDto;
import com.habitTool.habitTool.service.HabitLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habit-logs")
@RequiredArgsConstructor
public class HabitLogController {

    private final HabitLogService habitLogService;

    @GetMapping("/habit/{habitId}")
    public ResponseEntity<List<HabitLogDto>> getAllLogsByHabitId(
            @PathVariable(name = "habitId") Long habitId
    ) {
        return ResponseEntity.ok(
                habitLogService.getAllHabitsOfUser(habitId)
        );
    }

    @PutMapping("/{habitLogId}/status")
    public ResponseEntity<HabitLogDto> changeStatus(
            @PathVariable(name = "habitLogId") Long habitLogId,
            @RequestParam(name = "status") String status,
            @RequestParam(name = "date") String date
    ) {
        return ResponseEntity.ok(
                habitLogService.changeStatus(habitLogId, date, status)
        );
    }
    @GetMapping("/{habitLogId}/date")
    public ResponseEntity<HabitLogDto> getHabitByDateAndId(
            @PathVariable(name = "habitLogId") Long habitLogId,
            @RequestParam(name = "date") String date
    ) {
        return ResponseEntity.ok(
                habitLogService.getHabitByDateAndId(habitLogId, date)
        );
    }
}
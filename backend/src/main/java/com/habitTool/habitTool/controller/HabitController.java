package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.domain.enums.HabitDifficulty;
import com.habitTool.habitTool.domain.enums.HabitFrequency;
import com.habitTool.habitTool.dtos.HabitDto;
import com.habitTool.habitTool.dtos.HabitRequest;
import com.habitTool.habitTool.service.HabitService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/habits")
@RequiredArgsConstructor
public class HabitController {

    private final HabitService habitService;

    @PostMapping
    public ResponseEntity<HabitDto> createHabit(
            @RequestBody HabitRequest habitRequest
    ) {
        HabitDto dto = habitService.createHabit(habitRequest);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HabitDto> updateHabit(
            @PathVariable Long id,
            @RequestBody HabitRequest habitRequest
    ) {
        HabitDto dto = habitService.updateHabit(id, habitRequest);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(
            @PathVariable Long id
    ) {
        habitService.deleteHabit(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HabitDto> getHabitById(
            @PathVariable Long id
    ) {
        HabitDto dto = habitService.getHabitById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<HabitDto>> getHabitsByUser(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByUserId(userId, page, size)
        );
    }

    @GetMapping("/frequency")
    public ResponseEntity<Page<HabitDto>> getByFrequency(
            @RequestParam String frequency,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByFrequency(frequency, page, size)
        );
    }

    @GetMapping("/start-date")
    public ResponseEntity<Page<HabitDto>> getByStartDate(
            @RequestParam String startDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByStartDate(startDate, page, size)
        );
    }

    @GetMapping("/end-date")
    public ResponseEntity<Page<HabitDto>> getByEndDate(
            @RequestParam String endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByEndDate(endDate, page, size)
        );
    }

    @GetMapping("/category")
    public ResponseEntity<Page<HabitDto>> getByCategory(
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByCategory(category, page, size)
        );
    }

    @GetMapping("/difficulty")
    public ResponseEntity<Page<HabitDto>> getByDifficulty(
            @RequestParam String difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.getHabitsByDifficulty(difficulty, page, size)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<Page<HabitDto>> searchByTitle(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(
                habitService.searchHabitsByTitle(title, page, size)
        );
    }


    @GetMapping("/count/{userId}")
    public ResponseEntity<Integer> getCount(
            @PathVariable(name = "userId") Long userId
    ){
        Integer number = habitService.count(userId);
        return ResponseEntity.ok()
                .body(number);
    }
}
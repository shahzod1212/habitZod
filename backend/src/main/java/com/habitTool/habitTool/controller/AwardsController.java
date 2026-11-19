package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.AwardRequest;
import com.habitTool.habitTool.dtos.AwardsDto;
import com.habitTool.habitTool.service.AwardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/awards")
@RequiredArgsConstructor
public class AwardsController {
    private final AwardsService awardsService;

    @PostMapping
    public ResponseEntity<AwardsDto> create(
            @RequestBody AwardRequest awardRequest
            ){
        AwardsDto awardsDto = awardsService.create(awardRequest);
        return new ResponseEntity<>(awardsDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AwardsDto>> getAllAwards(){
        List<AwardsDto> list  = awardsService.getAllAwards();
        return ResponseEntity.ok().body(list);
    }
}

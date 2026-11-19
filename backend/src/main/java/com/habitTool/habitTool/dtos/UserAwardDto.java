package com.habitTool.habitTool.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAwardDto {
    private Long id;
    private Long userId;
    private Long awardId;
}

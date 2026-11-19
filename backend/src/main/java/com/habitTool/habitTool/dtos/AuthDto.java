package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {
    private String token;
    private String refreshToken;
    private User user;
}

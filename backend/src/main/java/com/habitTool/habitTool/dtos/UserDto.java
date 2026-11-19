package com.habitTool.habitTool.dtos;

import com.habitTool.habitTool.domain.enums.UserStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String password;


    private UserStatus status;
    private LocalDate createdAt;

    private LocalDate modifiedAt;

    private String refreshToken;
}

package com.habitTool.habitTool.controller;

import com.habitTool.habitTool.dtos.*;
import com.habitTool.habitTool.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthDto> register(
            @RequestBody UserRegisterRequest userRegisterRequest
    ) {
        AuthDto dto = userService.registerUser(userRegisterRequest);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(
            @RequestBody LoginUserRequest loginUserRequest
    ) {
        AuthDto dto = userService.loginUser(loginUserRequest);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthDto> refreshToken(
            @RequestBody RefreshTokenRequest refreshToken
            ) {
        AuthDto dto = userService.refreshAccessToken(refreshToken.getRefreshToken());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/status/active/{id}")
    public ResponseEntity<Void> changeStatus(
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "token") String token
    ){
        UserDto dto  = userService.changeStatus(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
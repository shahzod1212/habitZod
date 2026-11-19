package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.User;
import com.habitTool.habitTool.domain.enums.UserStatus;
import com.habitTool.habitTool.dtos.AuthDto;
import com.habitTool.habitTool.dtos.LoginUserRequest;
import com.habitTool.habitTool.dtos.UserDto;
import com.habitTool.habitTool.dtos.UserRegisterRequest;
import com.habitTool.habitTool.exception.InvalidTokenException;
import com.habitTool.habitTool.exception.UserAlreadyActive;
import com.habitTool.habitTool.exception.UserAlreadyExistsException;
import com.habitTool.habitTool.exception.UserNotFoundException;
import com.habitTool.habitTool.jwt.JwtUtils;
import com.habitTool.habitTool.mapper.UserMapper;
import com.habitTool.habitTool.repository.UserRepository;
import com.habitTool.habitTool.service.EmailService;
import com.habitTool.habitTool.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    @Transactional
    public AuthDto registerUser(UserRegisterRequest userRegisterRequest) {
        User user = userMapper.toEntity(userRegisterRequest);

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            throw new UserAlreadyExistsException("User with email already exists");
        }

        user.setPassword(
                passwordEncoder.encode(userRegisterRequest.getPassword())
        );
        user.setStatus(UserStatus.ACTIVE);

        User saved = userRepository.save(user);
        String activation = jwtUtils.generateActivationToken(saved.getEmail());

        String activationLink = "http://localhost:5173/auth/status/active/"+
                saved.getId()+
                "?token="+activation;

        emailService.sendEmailActivation(
                saved.getEmail(),
                activationLink
        );

        String jwtToken = jwtUtils.generateToken(saved.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(saved.getEmail());

        saved.setRefreshToken(refreshToken);
        userRepository.save(saved);

        AuthDto dto = new AuthDto();
        dto.setUser(saved);
        dto.setToken(jwtToken);
        dto.setRefreshToken(refreshToken);

        return dto;
    }

    @Override
    public AuthDto loginUser(LoginUserRequest loginUserRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserRequest.getEmail(),
                        loginUserRequest.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginUserRequest.getEmail());

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        String jwtToken = jwtUtils.generateToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

        user.setRefreshToken(refreshToken);
        User saved = userRepository.save(user);

        AuthDto dto = new AuthDto();
        dto.setUser(saved);
        dto.setToken(jwtToken);
        dto.setRefreshToken(refreshToken);

        return dto;
    }

    @Override
    public AuthDto refreshAccessToken(String token) {
        User user = userRepository.findByRefreshToken(token);

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        if (!jwtUtils.validateRefreshToken(token, user.getEmail())) {
            throw new InvalidTokenException("Invalid refresh token");
        }

        String newAccessToken = jwtUtils.generateToken(user.getEmail());

        AuthDto dto = new AuthDto();
        dto.setUser(user);
        dto.setToken(newAccessToken);
        dto.setRefreshToken(token);

        return dto;
    }

    @Override
    public UserDto changeStatus(Long id, String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!jwtUtils.extractEmail(token).equals(user.getEmail())) {
            throw new InvalidTokenException("Invalid activation token");
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            throw new UserAlreadyActive("User already active");
        }

        user.setStatus(UserStatus.ACTIVE);

        User saved = userRepository.save(user);

        return userMapper.toDto(saved);
    }
}
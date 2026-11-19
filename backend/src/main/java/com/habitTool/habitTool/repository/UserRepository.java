package com.habitTool.habitTool.repository;

import com.habitTool.habitTool.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByRefreshToken(String refreshToken);

    User findByEmailAndIdNot(String email, Long id);

}

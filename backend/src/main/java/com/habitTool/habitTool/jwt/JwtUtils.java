package com.habitTool.habitTool.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expirationToken}")
    private Long expirationToken;

    @Value("${jwt.expirationRefreshToken}")
    private Long expirationRefreshToken;

    public SecretKey getSigned(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(String email){
        return Jwts.builder()
                .signWith(getSigned())
                .claim("type", "access")
                .subject(email)
                .expiration(new Date(System.currentTimeMillis()+expirationToken))
                .issuedAt(new Date())
                .compact();
    }

    public String generateRefreshToken(String email){
        return Jwts.builder()
                .signWith(getSigned())
                .claim("type", "refresh")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+expirationRefreshToken))
                .subject(email)
                .compact();
    }
    public String generateActivationToken(String email){
        return Jwts.builder()
                .subject(email)
                .claim("type", "activation")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSigned())
                .compact();
    }

    public String extractEmail(String token){
        return Jwts.parser()
                .verifyWith(getSigned())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateAccessToken(String token, String email) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigned())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject().equals(email)
                && claims.get("type").equals("access")
                && claims.getExpiration().after(new Date());
    }

    public boolean validateRefreshToken(String token, String email) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigned())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject().equals(email)
                && claims.get("type").equals("refresh")
                && claims.getExpiration().after(new Date());
    }

}

package com.example.SistemaRoupas.controllers;

import com.example.SistemaRoupas.entity.User;
import com.example.SistemaRoupas.dto.LoginRequestDTO;
import com.example.SistemaRoupas.dto.RegisterRequestDTO;
import com.example.SistemaRoupas.dto.ResponseDTO;
import com.example.SistemaRoupas.infra.security.TokenService;
import com.example.SistemaRoupas.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body) {

        User user = this.repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            String role = user.getRole();
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token, role));

        }

        return ResponseEntity.badRequest().build();

    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        Optional<User> user = this.repository.findByEmail(body.email());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setRole(body.role());
            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            String role = newUser.getRole();
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token, role));
        }
        return ResponseEntity.badRequest().build();
    }
}

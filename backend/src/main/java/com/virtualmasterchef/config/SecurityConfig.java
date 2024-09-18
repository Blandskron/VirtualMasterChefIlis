package com.virtualmasterchef.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Deshabilitar CSRF para desarrollo local
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() // Permitir acceso a Swagger sin autenticación
                .requestMatchers("/auth/login", "/users/register").permitAll() // Permitir acceso al login y registro sin autenticación
                .anyRequest().authenticated() // Proteger todas las demás rutas
            )
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable()) // Permitir uso de la consola H2
            )
            .formLogin(form -> form
                .loginPage("/login") // Endpoint de inicio de sesión
                .defaultSuccessUrl("/swagger-ui/index.html", true) // Redirigir a Swagger tras iniciar sesión
                .permitAll() // Permitir el acceso a la página de login para todos los usuarios
            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

package com.virtualmasterchef.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Deshabilitar CSRF para desarrollo local
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll()  // Permitir acceso a la consola H2
                .anyRequest().authenticated()  // Otras rutas requieren autenticación
            )
            // Deshabilitar protecciones de cabeceras para H2
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable()) // Permitir uso de la consola H2
            )
            .formLogin(login -> login  // Usar configuración de login predeterminada
                .permitAll()  // Permitir acceso al formulario de login
            );

        return http.build();
    }
}

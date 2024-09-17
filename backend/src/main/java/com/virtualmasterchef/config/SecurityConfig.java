package com.virtualmasterchef.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                // Usamos AntPathRequestMatcher para rutas que no siguen el patrón MVC
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()  // Permitir acceso a la consola H2
                .anyRequest().authenticated()  // Cualquier otra ruta requiere autenticación
            )
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable()) // Permitir uso de la consola H2
            )
            .formLogin(login -> login  // Usar configuración de login predeterminada
                .permitAll()  // Permitir acceso al formulario de login
            );

        return http.build();
    }
}

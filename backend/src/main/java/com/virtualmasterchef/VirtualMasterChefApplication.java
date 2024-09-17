package com.virtualmasterchef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.virtualmasterchef.repositories")
public class VirtualMasterChefApplication {

    public static void main(String[] args) {
        SpringApplication.run(VirtualMasterChefApplication.class, args);
    }
}

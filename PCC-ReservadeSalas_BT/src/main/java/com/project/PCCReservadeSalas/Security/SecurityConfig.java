package com.project.PCCReservadeSalas.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import com.project.PCCReservadeSalas.Services.UserService;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
public class SecurityConfig {
      @Autowired
      private UserService userDetailsService;

      @Autowired
      private PasswordEncoder passwordEncoder;

      @Bean
      public CorsFilter corsFilter() {
          CorsConfiguration corsConfiguration = new CorsConfiguration();
          corsConfiguration.addAllowedOrigin("http://localhost:4200"); // Allow requests from this origin
          corsConfiguration.addAllowedHeader("*"); // Allow all headers
          corsConfiguration.addAllowedMethod("*"); // Allow all HTTP methods

          UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
          source.registerCorsConfiguration("/**", corsConfiguration);

          return new CorsFilter(source);
      }

      @Bean
      public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
      }

      @Bean
      public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
          AuthenticationManagerBuilder authenticationManagerBuilder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
          authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);

          httpSecurity
              .csrf().disable()
              .cors() // Enable CORS configuration
              .and()
              .authorizeHttpRequests()
              .requestMatchers(antMatchersAsArray(HttpMethod.POST, "*/auth/*", "/auth/*")).permitAll()
              .anyRequest().authenticated()
              .and()
              .httpBasic();

          httpSecurity.authenticationManager(authenticationManagerBuilder.build());

          return httpSecurity.build();
      }

      private RequestMatcher[] antMatchersAsArray(HttpMethod httpMethod, String... antPatterns) {
        String method = (httpMethod != null) ? httpMethod.toString() : null;
        RequestMatcher[] matchers = new RequestMatcher[antPatterns.length];
        for (int index = 0; index < antPatterns.length; index++) {
          matchers[index] = new AntPathRequestMatcher(antPatterns[index], method);
        }
        return matchers;
		}
}

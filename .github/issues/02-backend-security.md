# Backend has unsafe default runtime settings

**Severity:** High
**Labels:** security, high-priority, backend

## Description

The backend application ships with security settings that are unsafe for production environments.

## Security Issues

1. **Unrestricted CORS:** [SpringBootBoilerplateApplication.java](../../app-backend/src/main/java/co/devskills/springbootboilerplate/SpringBootBoilerplateApplication.java#L22) allows all origins with `.allowedOriginPatterns("*")`

2. **Credentials Enabled Globally:** [SpringBootBoilerplateApplication.java](../../app-backend/src/main/java/co/devskills/springbootboilerplate/SpringBootBoilerplateApplication.java#L25) enables `.allowCredentials(true)` for cross-origin requests from any origin

3. **Auto-DDL in Default Profile:** [application.properties](../../app-backend/src/main/resources/application.properties#L2) enables `spring.jpa.hibernate.ddl-auto=update` without profile restrictions

4. **Hardcoded Credentials:** [application.properties](../../app-backend/src/main/resources/application.properties#L8-L9) contains hardcoded datasource username and password

## Risk

- Allows credential theft through cross-origin attacks
- Database schema changes applied automatically in production
- Credentials exposed in source control
- Not following security best practices for production deployment
- Potential compliance violations (PCI-DSS, SOC2, etc.)

## Recommended Fix

1. Move CORS configuration to profile-specific settings with restrictive defaults:

   ```java
   @Profile("dev")
   @Bean
   public WebMvcConfigurer corsConfigurer() {
       // permissive for development only
   }
   ```

2. Disable allowCredentials or restrict to specific trusted origins:

   ```java
   .allowedOrigins("https://yourdomain.com")
   .allowCredentials(true)
   ```

3. Set ddl-auto to 'none' or 'validate' in production profiles:

   ```properties
   # application-prod.properties
   spring.jpa.hibernate.ddl-auto=validate
   ```

4. Use environment variables or secrets management for credentials:

   ```properties
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   ```

5. Add application-dev.properties with permissive settings for local development only

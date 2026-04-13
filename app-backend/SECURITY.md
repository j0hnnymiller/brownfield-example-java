# Backend Security Configuration

This document describes the security configurations implemented in the backend application.

## Security Fixes Implemented

### 1. Profile-Specific CORS Configuration

- **Dev Profile**: Permissive CORS settings (`allowedOriginPatterns("*")`) for local development
- **Production**: CORS configuration must be explicitly defined with specific allowed origins
- **Implementation**: `@Profile("dev")` annotation restricts permissive CORS to development only

### 2. Environment-Based Credentials

- **Default**: Uses environment variables `${DB_USERNAME}` and `${DB_PASSWORD}`
- **Dev Fallback**: Provides default values for local development convenience
- **Production**: Requires explicit environment variables (no defaults)
- **Never commit credentials** to source control

### 3. Safe DDL Defaults

- **Default**: `spring.jpa.hibernate.ddl-auto=validate` (safe for production)
- **Dev Profile**: `ddl-auto=update` for convenient local development
- **Production**: `ddl-auto=validate` prevents automatic schema changes

## Running with Profiles

### Development Mode (Local Development)

```bash
./gradlew bootRun --args='--spring.profiles.active=dev'
```

Or set environment variable:

```bash
export SPRING_PROFILES_ACTIVE=dev
./gradlew bootRun
```

### Production Mode

```bash
export SPRING_PROFILES_ACTIVE=prod
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
java -jar app-backend.jar
```

## CORS Configuration for Production

For production environments, create a production-specific CORS configuration:

```java
@Profile("prod")
@Bean
public WebMvcConfigurer prodCorsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("https://yourdomain.com", "https://app.yourdomain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }
    };
}
```

## Security Best Practices

1. **Never commit credentials** to source control
2. **Use environment variables** or secrets management (Azure Key Vault, AWS Secrets Manager, etc.)
3. **Always specify allowed origins** explicitly in production
4. **Use `validate` or `none`** for ddl-auto in production
5. **Enable Spring Security** for authentication and authorization
6. **Configure HTTPS/TLS** for production deployments
7. **Implement rate limiting** to prevent abuse
8. **Regular security audits** and dependency updates

## Environment Variables Reference

| Variable                 | Required             | Default            | Description                                 |
| ------------------------ | -------------------- | ------------------ | ------------------------------------------- |
| `SPRING_PROFILES_ACTIVE` | No                   | none               | Active Spring profile (`dev`, `prod`, etc.) |
| `DB_USERNAME`            | Dev: No<br>Prod: Yes | `admin` (dev only) | Database username                           |
| `DB_PASSWORD`            | Dev: No<br>Prod: Yes | `admin` (dev only) | Database password                           |

## Testing Security Configuration

Verify the security configuration:

```bash
# Check that dev profile allows CORS
curl -H "Origin: http://localhost:3000" -I http://localhost:8080/ping

# Verify environment variables are used
echo $DB_USERNAME
echo $DB_PASSWORD

# Check active profile
curl http://localhost:8080/actuator/env | grep activeProfiles
```

## Compliance Considerations

These configurations help meet compliance requirements:

- **PCI-DSS**: No hardcoded credentials, restricted CORS
- **SOC 2**: Environment-based secrets management
- **HIPAA**: Secure defaults prevent data exposure
- **GDPR**: Controlled cross-origin access

## Additional Resources

- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Boot Security Best Practices](https://spring.io/guides/topicals/spring-security-architecture/)

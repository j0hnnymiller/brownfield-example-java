# Build/start workflow is not cross-platform and partially broken

**Severity:** High
**Labels:** bug, high-priority, build, cross-platform

## Description

The root build/start workflow in package.json is not portable and is partially broken as checked in.

## Problems

1. `./gradlew` in [package.json](../../package.json#L5) fails under Windows npm execution
2. [package.json](../../package.json#L8) references `spring-boot-boilerplate-0.0.1-SNAPSHOT-plain.jar` but [app-backend/build.gradle](../../app-backend/build.gradle#L9) has `bootJar { enabled = false }`, so this jar name doesn't match what Gradle produces
3. [package.json](../../package.json#L10) backgrounds processes with `&`, which is fragile across shells and makes error handling weak

## Verified Failures

- `npm run build:backend` fails on Windows with `'.' is not recognized...`
- `npm run start` fails to find the backend jar

## Recommended Fix

1. Use platform-independent Gradle wrapper scripts (gradlew.bat for Windows, ./gradlew for Unix)
   - Consider using cross-env or npm-run-all for better cross-platform support
2. Fix jar path to match actual Gradle output or adjust build.gradle to produce the expected artifact
   - Either change bootJar configuration or update the artifact name in package.json
3. Use more robust process management for concurrent startup
   - Consider npm-run-all or concurrently packages

## Impact

- Onboarding broken for Windows developers
- Documentation instructions don't work as written
- CI may work but local development is blocked
- Reduces contributor pool to Unix-only developers

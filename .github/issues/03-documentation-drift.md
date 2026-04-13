# Documentation and build metadata have drifted from actual configuration

**Severity:** Medium
**Labels:** documentation, medium-priority, developer-experience

## Description

Repository documentation and build metadata contain inconsistencies that mislead contributors and complicate onboarding.

## Documentation Drift

1. [README.md](../../README.md#L16) says "Spring Boot 2" but [app-backend/build.gradle](../../app-backend/build.gradle#L2) uses Spring Boot 3.5.7

2. [README.md](../../README.md#L15) says "Java 21" but [README.md](../../README.md#L33) tells users to configure Java 17, while [app-backend/build.gradle](../../app-backend/build.gradle#L9) requires Java 21

3. [README.md](../../README.md#L58) references `cypress/integration` directory, but the repository uses `cypress/e2e`

## Impact

- Confusing onboarding experience for new contributors
- Support burden from version mismatches
- Failed setup attempts due to wrong Java version
- Broken links/references in documentation
- Time wasted debugging environment issues

## Recommended Fix

1. Update README.md to reflect actual Spring Boot 3.5.7

   ```markdown
   - Spring Boot 3
   ```

2. Standardize on Java 21 throughout documentation

   ```markdown
   1. Make sure the required version of Java (21) is configured on your local env.
   ```

3. Update test directory references to `cypress/e2e`

   ```markdown
   npm run test # run project tests under `cypress/e2e`
   ```

4. Consider adding a version verification script that checks documentation against actual build configs
   - Could use a simple script to parse build.gradle and validate README.md
   - Add to CI/CD to catch drift automatically

## Acceptance Criteria

- [ ] README.md accurately reflects Spring Boot version
- [ ] All Java version references are consistent (21)
- [ ] Directory paths in documentation match actual structure
- [ ] No broken links or references in documentation

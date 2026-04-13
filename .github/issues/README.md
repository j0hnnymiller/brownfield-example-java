# Review Findings Issues

This directory contains issues identified during the evergreen software development practices review on April 9, 2026.

## Issues

1. **[Build/start workflow is not cross-platform and partially broken](01-build-portability.md)** - High Priority
   - Windows build fails
   - Jar path mismatch
   - Fragile process management

2. **[Backend has unsafe default runtime settings](02-backend-security.md)** - High Priority ⚠️
   - Unrestricted CORS
   - Hardcoded credentials
   - Auto-DDL in production
   - Security best practices violations

3. **[Documentation and build metadata have drifted](03-documentation-drift.md)** - Medium Priority
   - Version inconsistencies
   - Incorrect directory references
   - Onboarding confusion

4. **[Frontend toolchain contains deprecation warnings](04-frontend-deprecations.md)** - Medium Priority
   - TypeScript ES5 target deprecated
   - Module resolution deprecated
   - Vitest reporter deprecated

## Status

**Issue #4 (Test Coverage)** - ✅ **COMPLETED**
The automated verification issue has been resolved with:

- Backend unit tests added (PingControllerTest.java)
- Frontend unit tests strengthened (App.test.tsx)
- Cypress tests enhanced with deeper assertions
- CI workflow updated with unit test gates
- Auto-merge restricted to patch-only Dependabot updates

## How to Create GitHub Issues

Once you enable issues on this repository, you can create them with:

```bash
gh issue create -R j0hnnymiller/brownfield-example-java \
  --title "Build/start workflow is not cross-platform and partially broken" \
  --body-file .github/issues/01-build-portability.md \
  --label "bug,high-priority"
```

Or enable issues and manually create them using the content from these files.

## Priority Order

Recommended implementation order:

1. **Issue #2 (Security)** - Address security vulnerabilities first
2. **Issue #1 (Build)** - Enable Windows development
3. **Issue #4 (Deprecations)** - Clear technical debt
4. **Issue #3 (Documentation)** - Improve onboarding

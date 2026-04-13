# Frontend toolchain contains deprecation warnings

**Severity:** Medium
**Labels:** tech-debt, medium-priority, frontend, typescript

## Description

The frontend configuration uses deprecated TypeScript and Vitest settings that will break in future versions.

## Deprecation Issues

1. [tsconfig.json](../../app-frontend/tsconfig.json#L3) targets `es5`, which TypeScript reports as deprecated and will stop functioning in TypeScript 7.0

2. [tsconfig.json](../../app-frontend/tsconfig.json#L17) uses deprecated `"node"` module resolution mode (should use 'bundler' or 'nodenext')

3. [vitest.config.js](../../app-frontend/vitest.config.js#L13) uses deprecated `"basic"` reporter, which will be removed in Vitest v3

## Current Impact

- Deprecation warnings in build output
- Technical debt accumulating
- Future TypeScript/Vitest upgrades will require breaking changes
- Builds may fail unexpectedly after toolchain updates

## Recommended Fix

1. Update tsconfig.json target to 'es2020' or later (matching vite.config.js build target):

   ```json
   {
     "compilerOptions": {
       "target": "es2020"
     }
   }
   ```

2. Change moduleResolution to 'bundler' (recommended for Vite projects):

   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler"
     }
   }
   ```

3. Replace 'basic' reporter with 'default' reporter with `summary: false` option:

   ```javascript
   {
     test: {
       reporters: [
         [
           "default",
           {
             summary: false,
           },
         ],
       ];
     }
   }
   ```

4. Test all changes:
   ```bash
   npm --prefix app-frontend run build
   npm --prefix app-frontend test
   ```

## Acceptance Criteria

- [ ] No deprecation warnings in build output
- [ ] All tests pass after changes
- [ ] Build completes successfully
- [ ] Configuration aligned with current best practices for Vite projects

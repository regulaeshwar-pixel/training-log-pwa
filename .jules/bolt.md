## 2024-05-22 - Non-Module Testing
**Learning:** `src/app.js` is a non-module script, making direct unit testing impossible without `vm` sandbox mocking.
**Action:** When testing vanilla JS apps, immediately reach for `vm` based testing or E2E tests instead of trying to import files.

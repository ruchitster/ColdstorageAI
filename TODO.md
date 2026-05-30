# QA Automation Testing Plan — Playwright + Jest + Supertest (Enterprise)

## Checklist (in exact implementation order)

### PHASE 1 — PLAYWRIGHT SETUP
- [x] Install Playwright in `frontend`

- [ ] Add `frontend/playwright.config.js` with baseURL + artifacts (screenshots/videos/traces)
- [ ] Create Playwright test folder structure under `frontend/tests/`
- [ ] Add `frontend` npm scripts: `test:playwright`

### PHASE 2 — AUTHENTICATION TESTING (Playwright)
- [ ] Add stable `data-testid` attributes to Login + Protected flow (logout)
- [ ] Implement Playwright tests: valid login, invalid login, protected route, token persistence, logout clears storage, redirect after logout

### PHASE 3 — DASHBOARD TESTING (Playwright)
- [ ] Add/extend `data-testid` in Dashboard layout/widgets/sidebar
- [ ] Implement tests for load, sidebar navigation, widgets/cards, loading/error states

### PHASE 4 — ERP REPORT TESTING (Playwright)
- [ ] Add/extend `data-testid` for filters/search/pagination/table/empty/error in each report page
- [ ] Implement tests for inward/outward/inward-stock-movement/product-stock

### PHASE 5 — AI CHATBOT TESTING (Playwright)
- [ ] Add/extend `data-testid` in ChatBot component
- [ ] Implement tests for input/send, loading spinner, AI response rendering (partial assertions), error handling, conversation history

### PHASE 6 — BACKEND API TESTING (Jest + Supertest)
- [ ] Install Jest + Supertest in `backend`
- [ ] Add `backend/jest.config.js`
- [ ] Implement tests for /auth/login, /ai/chat, /reports/*, JWT middleware
- [ ] Add deterministic mocking helpers

### PHASE 7 — GEMINI MOCKING (Backend)
- [ ] Implement Gemini mocking layer to avoid real API calls (deterministic)

### PHASE 8 — SQL SAFETY TESTING (Backend)
- [ ] Add tests validating SELECT-only and blocked operations
- [ ] Ensure unsafe/malformed prompts are handled safely

### PHASE 9 — GITHUB ACTIONS CI/CD
- [ ] Add `.github/workflows/ci.yml`:
  - [ ] install dependencies
  - [ ] build frontend
  - [ ] run backend Jest tests
  - [ ] run Playwright tests
  - [ ] upload HTML/JUnit + Playwright reports/traces artifacts

### PHASE 10 — ENTERPRISE BEST PRACTICES
- [ ] Document flaky test prevention + selector standards + debugging steps
- [ ] Provide “open reports in browser” workflow via generated artifacts


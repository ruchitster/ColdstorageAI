# Test IDs policy (Playwright)

Add stable selectors using `data-testid`.

Status: policy draft added. Next implementors should update the following components with these exact IDs: `Login.jsx`, `Sidebar.jsx`, `DashboardHome.jsx`, each report page (`InwardReport.jsx`, `OutwardReport.jsx`, `InwardStockMovementReport.jsx`, `ProductStock.jsx`), and `ChatBot.jsx`.


## Required test IDs to add (minimum)
- Login:
  - `login-username`
  - `login-password`
  - `login-submit`
  - `login-error` (optional)
- Private/protected redirect:
  - (no fixed testID required; tests may assert URL or presence of login submit)
- Logout:
  - `logout-button`

## Sidebar / Navigation
- `sidebar-logo`
- `nav-dashboard`
- `nav-inward-report`
- `nav-outward-report`
- `nav-stock-movement`
- `nav-product-stock`

## Dashboard Home
- `dashboard-loading`
- `dashboard-stats`

## Reports pages
For each report page add:
- `report-title` (text like Inward Report / Outward Report etc.)
- `report-loading`
- `report-empty`
- `report-table`
- `report-pagination`

For filters/search components:
- `report-filters` wrapper
- `report-filter-search`

## Chatbot
- `chatbot-toggle`
- `chatbot-input`
- `chatbot-send`
- `chatbot-loading`
- `chatbot-messages`


## 2024-05-22 - [Redundant Map Creation in Render Loop]
**Learning:** The application rebuilds the entire DOM on every state change (via `renderApp`). Functions called within `renderApp` (like `calculateStreak`) that rebuild large data structures (Maps) from scratch become major bottlenecks.
**Action:** Lift expensive data structure creation out of helper functions or cache them based on the source data's reference/length, especially when the source data (`allData`) is relatively stable between high-frequency UI updates.

## 2024-05-21 - [Repeated Array Filtering in Render Loop]
**Learning:** `renderApp` calls multiple helper functions, each of which filters the same `allData` array to valid entries and sorts it. This resulted in O(K*N) operations per render.
**Action:** Centralize the filtering/sorting into a memoized `getValidHistory` function to reduce complexity to O(N) (amortized).

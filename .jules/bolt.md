## 2024-05-24 - Rebuilding Maps in Render Loop
**Learning:** In a vanilla JS 'render everything' loop, rebuilding large data structures (like Maps) from scratch on every frame is a hidden bottleneck, turning O(1) lookups into O(N) operations.
**Action:** Identify derived data structures that only depend on the data model and cache/memoize them, invalidating only when the underlying data changes.

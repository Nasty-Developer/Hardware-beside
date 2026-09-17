---
name: Uploaded reference crops
description: How to remove browser and social UI from product screenshots before using them in the storefront.
---

When using uploaded mobile screenshots as storefront imagery, measure crop boundaries against the source image's intrinsic pixel dimensions, not the scaled preview shown in chat. Browser chrome and social overlays can be substantially taller in the source than they appear visually.

**Why:** The first crop pass retained browser headers and image-action overlays because the displayed preview was scaled down; the corrected assets required source-pixel crop coordinates and small background masks where overlays crossed the product.

**How to apply:** Inspect the source dimensions first, crop to the product/chart region, remove overlay strips or mask unavoidable UI marks, and verify the rendered asset in the actual category cards before delivery.
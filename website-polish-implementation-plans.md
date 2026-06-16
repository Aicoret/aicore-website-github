# AICORE Website Polish Implementation Plans

## Purpose

This document defines a phase-by-phase implementation plan for polishing the AICORE company website based only on my own review and recommendations.

The goal is not to redesign the website. The goal is to move it from "strong content draft with visible rough edges" to "credible, launch-ready technical B2B website."

## Guiding Principles

- Fix visible blockers before visual enhancements.
- Preserve the current brand direction, typography, and dark technical feel.
- Keep `Discuss a Project` as the main consultative CTA unless responsive layout makes that impossible.
- Prefer concrete technical visuals over decorative abstract imagery.
- Use placeholders for product visuals first, then replace them with final mockups later.
- Keep changes scoped and verifiable phase by phase.
- Avoid broad refactors while launch-readiness issues remain.

## Phase Overview

| Phase | Name | Priority | Main Outcome |
| --- | --- | --- | --- |
| 1 | Global Launch Blockers | Critical | First-load experience stops feeling broken |
| 2 | Route & Content Integrity | Critical | Public routes do not expose missing/API-error content |
| 3 | Product Credibility Structure | Critical | Product pages gain visual-proof slots and clearer maturity handling |
| 4 | Product Visual Placeholders | High | Every product has a credible placeholder visual area |
| 5 | Homepage & Navigation Polish | High | Homepage becomes cleaner, safer on mobile/tablet, and more persuasive |
| 6 | Solution Page Differentiation | High | Solution pages stop feeling template-identical |
| 7 | Insights & Editorial Polish | Medium | Insights become more readable and less text-only |
| 8 | Industries & Footer Polish | Medium | Supporting pages gain clarity and consistency |
| 9 | QA, Accessibility, and Release Check | Critical | Site is verified across routes and breakpoints |

## Phase 1: Global Launch Blockers

### Objective

Remove the site-wide issues that make the website look broken on first load.

### Scope

1. Redesign the cookie banner into a compact bottom bar/toast.
2. Fix tablet navigation CTA wrapping.
3. Fix homepage mobile horizontal clipping.
4. Ensure floating controls do not compete for the same mobile screen area.

### Likely Files

- `src/components/cookie-banner.tsx`
- `src/components/layout/header.tsx`
- `src/components/back-to-top.tsx`
- `src/components/ai-chat.tsx`
- `src/components/home/Hero.tsx`
- `src/index.css`

### Implementation Details

#### Cookie Banner

Replace the current large card-style banner with a compact bottom bar:

- Desktop: centered bottom bar, max width around `760px`.
- Mobile: full-width bottom strip with compact spacing.
- Keep text to two short lines at most.
- Keep `Accept All` visible.
- Keep `Decline` available.
- Move optional controls behind `Manage`.
- Keep close button visible and at least 36px tap target.
- Ensure expanded preferences can scroll if needed on small screens.

Recommended behavior:

- Default collapsed height should stay below roughly `96px` on mobile.
- Expanded preferences may be taller, but only after the user explicitly opens `Manage`.
- Banner should not cover primary CTA buttons in the first viewport.

#### Tablet Navigation CTA

Keep the copy:

`Discuss a Project`

Responsive fixes:

- Add `whitespace-nowrap` to CTA.
- Reduce tablet CTA padding.
- Reduce nav gaps around `md` to `lg`.
- Consider hiding the `Contact Us` nav link at constrained tablet widths because the CTA already links to contact.
- If needed, switch desktop nav to mobile menu earlier, around `900px` or `1024px`.

#### Mobile Hero Clipping

Audit the homepage hero for horizontal overflow.

Likely fixes:

- Ensure hero headline allows wrapping naturally.
- Check highlighted words for nowrap or inline layout issues.
- Constrain pill/badge row with wrapping or horizontal scroll.
- Avoid setting `overflow-x-hidden` as the only fix until the wide child is identified.

### Acceptance Criteria

- At 390px mobile width, no hero text is clipped.
- At 768px tablet width, `Discuss a Project` does not wrap into multiple lines.
- Cookie banner does not cover homepage primary CTAs.
- Cookie banner does not cover product feature cards on first load.
- Cookie banner does not cover article body text in a way that prevents reading.
- No horizontal page scroll on mobile.

### Verification

Run:

```bash
pnpm --filter @aicore/company-website typecheck
pnpm --filter @aicore/company-website dev
```

Manual screenshot checks:

- `/` at 390x844
- `/` at 768x1024
- `/products` at 390x844
- `/products/throughport-wms` at 390x844 and 1440x1000
- `/insights/sensor-to-dashboard-iot-stack` at 390x844 and 1440x1000

## Phase 2: Route & Content Integrity

### Objective

Ensure public-facing routes do not show broken content, API failure language, or missing pages that should exist.

### Scope

1. Fix or remove `/insights/building-business-case-ai-automation-2025`.
2. Verify `/products/device-fleet-management-platform` in local and deployed contexts.
3. Verify all footer/legal/static routes.
4. Improve missing article/product states.

### Likely Files

- `src/lib/data.ts`
- `src/lib/articles.ts`
- `src/pages/insight-detail.tsx`
- `src/pages/product-detail.tsx`
- `src/pages/insights.tsx`
- `src/pages/sitemap.tsx`
- `scripts/seo-routes.mjs`
- `scripts/generate-sitemap.mjs`
- `public/sitemap.xml`

### Implementation Details

#### Broken Insight Route

Choose one:

Option A: Add a static fallback article.

- Add `building-business-case-ai-automation-2025` to the static `insights` list.
- Include proper title, excerpt, category, read time, author, date, and body sections.
- Ensure it appears in insights index only if content is ready.

Option B: Remove/unpublish route references.

- Remove links to that slug from indexes, sitemap, SEO route scripts, and any static references.
- Keep the route unavailable until the publishing API serves it reliably.

Preferred approach:

- If the article is strategically useful, add static fallback now.
- If content quality is not ready, remove the route from public navigation and sitemap.

#### Missing Article State

Do not show:

`The publishing API could not return this article.`

Replace with public-friendly copy:

`This article is not available right now.`

Add links to:

- Insights index.
- Related/latest articles if available.

#### Device Fleet Product Route

Local review showed this route renders successfully. Still verify:

- Vite dev.
- Production build preview.
- Deployed URL if available.

Do not change the product data unless production reproduces the issue.

### Acceptance Criteria

- `/insights/building-business-case-ai-automation-2025` either renders real content or is removed from all public links/sitemaps.
- Missing content pages do not expose internal API failure language.
- `/products/device-fleet-management-platform` renders in local production preview.
- `/academy`, `/privacy`, `/terms`, `/sitemap`, `/company-profile`, `/request-demo`, and `/contact` render correctly.

### Verification

Run:

```bash
pnpm --filter @aicore/company-website typecheck
pnpm --filter @aicore/company-website build
pnpm --filter @aicore/company-website serve
```

Check:

- `/products/device-fleet-management-platform`
- `/insights/building-business-case-ai-automation-2025`
- `/sitemap`
- `/privacy`
- `/terms`
- `/academy`
- `/company-profile`

## Phase 3: Product Credibility Structure

### Objective

Improve the product experience structurally before final visual assets are available.

### Scope

1. Add product maturity definitions.
2. Sort or group products so buyer-facing items appear first.
3. Adjust CTA behavior for internal/prototype products.
4. Add visual-proof sections to product detail template.
5. Add descriptions to product features.

### Likely Files

- `src/lib/data.ts`
- `src/pages/products.tsx`
- `src/pages/product-detail.tsx`
- `src/components/ui/tooltip.tsx`
- Optional new component: `src/components/product/product-visual-placeholder.tsx`
- Optional new component: `src/components/product/product-maturity-legend.tsx`

### Implementation Details

#### Product Maturity Legend

Add a compact legend near product filters:

- `Client-Ready`: available for demos and client deployment.
- `MVP`: core functionality exists; advanced features may still be evolving.
- `Prototype`: early concept or pilot-stage product.
- `Internal Use`: built for AICORE operations; available only as a reference or custom adaptation.

Use concise copy and avoid making the product portfolio feel immature.

#### Product Sorting

Default `All` view should prioritize:

1. Client-Ready
2. MVP
3. Prototype
4. Internal Use

This prevents `AICORE GrowthOS` from appearing as the first buyer-facing product while marked `Internal Use`.

#### CTA Behavior

Recommended CTA behavior:

- `Client-Ready`: `Request Demo`
- `MVP`: `Discuss Pilot`
- `Prototype`: `Discuss Concept`
- `Internal Use`: `Discuss Similar Platform`

Keep `View Product` available for all.

#### Feature Descriptions

Add feature metadata to product data:

```ts
features: [
  {
    label: "Inventory tracking",
    description: "Track stock movement across locations with real-time item status."
  }
]
```

If changing the data shape is too wide for one pass, add a `featureDescriptions` map keyed by product slug.

### Acceptance Criteria

- Products index explains maturity terms.
- Buyer-facing products appear first by default.
- Internal/prototype products no longer imply standard live demos.
- Product detail pages show feature descriptions, not only pills.
- Existing product routes still render.

### Verification

Check:

- `/products`
- `/products/aicore-growthos`
- `/products/throughport-wms`
- `/products/iot-monitoring-platform`
- `/products/device-fleet-management-platform`
- `/products/smart-energy-monitoring-platform`
- `/products/ai-business-assistant-platform`

## Phase 4: Product Visual Placeholders

### Objective

Add credible visual-proof placeholders now, while leaving room for final dashboards and diagrams later.

### Scope

1. Add a reusable product visual placeholder component.
2. Add visual slots to product cards.
3. Add visual slots to product detail pages.
4. Use product-specific placeholder content, not generic empty boxes.

### Important Note

Final product screenshots are not required in this phase. Use placeholders that communicate intended product shape.

The placeholder should clearly indicate:

- It is a concept preview.
- It represents the type of system.
- It is not a live production screenshot unless explicitly stated.

### Likely Files

- `src/pages/products.tsx`
- `src/pages/product-detail.tsx`
- `src/lib/data.ts`
- New component: `src/components/product/product-visual-placeholder.tsx`
- New component: `src/components/product/product-preview-card.tsx`

### Product Placeholder Concepts

#### AICORE GrowthOS

Placeholder type:

- CRM pipeline dashboard.

Elements:

- Lead pipeline columns.
- AI score badges.
- Follow-up queue.
- Revenue or conversion trend mini chart.

Label:

`Concept preview: AI-assisted pipeline dashboard`

#### Throughport WMS

Placeholder type:

- Warehouse operations dashboard.

Elements:

- Inventory table.
- Goods-in/goods-out cards.
- Barcode/QR scan event row.
- Stock movement graph.

Label:

`Concept preview: warehouse inventory control dashboard`

#### IoT Monitoring Platform

Placeholder type:

- Sensor-to-cloud architecture and live telemetry dashboard.

Elements:

- Sensor nodes.
- Gateway.
- Cloud ingestion.
- Dashboard.
- Alert line.

Label:

`Concept preview: sensor-to-cloud monitoring flow`

#### Device Fleet Management

Placeholder type:

- Fleet health dashboard.

Elements:

- Device status grid.
- OTA update progress.
- Remote diagnostics panel.
- Alert status.

Label:

`Concept preview: connected device fleet dashboard`

#### Smart Energy Monitoring

Placeholder type:

- Solar/energy monitoring dashboard.

Elements:

- Inverter status.
- Energy yield chart.
- Battery state card.
- Fault alert.

Label:

`Concept preview: solar and energy asset dashboard`

#### AI Business Assistant

Placeholder type:

- Chat plus workflow automation panel.

Elements:

- Chat transcript preview.
- Connected documents.
- Suggested actions.
- Workflow trigger.

Label:

`Concept preview: AI assistant workspace`

### Visual Style Requirements

- Use brand colors sparingly.
- Avoid loud gradients.
- Keep placeholders technical and sober.
- Use simple charts, grids, and flow lines.
- Do not use stock imagery.
- Keep card radius consistent with existing design.
- Ensure placeholder text is legible on mobile.

### Acceptance Criteria

- Every product card has a visual preview area.
- Every product detail page has a visual proof section.
- Visuals are product-specific.
- Placeholders are clearly labeled as concept previews.
- No layout shift or overflow on mobile.

### Verification

Screenshot:

- `/products` at desktop, tablet, mobile.
- All product detail pages at desktop and mobile.

## Phase 5: Homepage & Navigation Polish

### Objective

Make the homepage feel more intentional, less repetitive, and safer across breakpoints.

### Scope

1. Add or improve a homepage system-stack visual.
2. Reduce mid-page card-grid monotony.
3. Strengthen proof and conversion rhythm.
4. Ensure mobile hero remains polished after Phase 1 fixes.

### Likely Files

- `src/pages/home.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/SolutionsPreview.tsx`
- `src/components/home/ProductsPreview.tsx`
- `src/components/home/WhyAICORE.tsx`
- `src/components/home/AIEmployees.tsx`
- `src/components/home/CTA.tsx`
- `src/index.css`

### Implementation Details

#### Hero Visual

Add a compact system-stack visual:

`Physical systems -> Data layer -> AI/automation -> Dashboard/workflow -> Human decision`

This can be a code-native visual built with HTML/CSS and lucide icons. It should feel like an engineering diagram, not a decorative illustration.

#### Section Rhythm

Replace one repeated card grid with a stronger layout:

- A full-width technical process band.
- A two-column system diagram and explanation.
- A compact proof/implementation workflow strip.

Do not add marketing-style hero sections or oversized decorative cards.

#### CTA Rhythm

Keep CTAs specific:

- `Discuss a Project`
- `Explore AI Employees`
- `View Products`
- `Explore Solutions`

Avoid generic repeated `Get in Touch`.

### Acceptance Criteria

- Homepage has no mobile clipping.
- Homepage first viewport feels clear with or without dismissed cookie banner.
- Tablet nav remains clean.
- At least one homepage section breaks the repeated card pattern.
- System visual reinforces AICORE's technical identity.

## Phase 6: Solution Page Differentiation

### Objective

Make solution pages feel more specific and less template-identical.

### Scope

1. Add a proof/example line to each solution card.
2. Add diagram slots to solution detail pages.
3. Make solution FAQs more specific.
4. Separate AICORE Academy from delivery services where appropriate.

### Likely Files

- `src/lib/data.ts`
- `src/pages/solutions.tsx`
- `src/pages/solution-detail.tsx`
- Optional component: `src/components/solution/solution-diagram-placeholder.tsx`

### Implementation Details

#### Solution Index Proof Lines

Add one practical example per solution:

- AI Systems: document processing, assistant, or data extraction example.
- Automation: approval flow, follow-up automation, internal workflow.
- SaaS: GrowthOS or WMS as example.
- Embedded/IoT: sensor-to-dashboard deployment pattern.
- Robotics: STEM kit, control system, or hardware training example.
- Developer Tools: HIL testing or protocol analyzer.
- Mobile Apps: field inspection or IoT companion app.
- Academy: training program delivery.

#### Academy Placement

Keep Academy visible, but visually separate it as:

`Training & Capability Building`

rather than making it feel like one of the core engineering delivery services.

#### Solution Detail Diagrams

Add a placeholder diagram per solution type:

- AI systems: data -> model/tool -> workflow.
- Automation: trigger -> decision -> action -> audit.
- SaaS: user -> app -> API -> database -> admin.
- IoT: device -> gateway -> cloud -> dashboard.
- Robotics: sensor -> controller -> actuator -> feedback.
- Dev tools: firmware -> test rig -> CI -> report.
- Mobile: field user -> mobile app -> API -> dashboard.
- Academy: learner -> lab -> project -> certification/outcome.

### Acceptance Criteria

- Solution index feels more specific.
- Academy is clearly framed.
- Solution detail pages have distinct visual/diagram areas.
- FAQs are no longer obviously boilerplate.

## Phase 7: Insights & Editorial Polish

### Objective

Improve insight pages without overdecorating them.

### Scope

1. Fix mobile filter layout.
2. Add optional article cover/category visual support.
3. Improve article missing state.
4. Make article sidebar CTA more context-aware.

### Likely Files

- `src/pages/insights.tsx`
- `src/pages/insight-detail.tsx`
- `src/lib/data.ts`
- `src/lib/articles.ts`
- Optional component: `src/components/article/article-cover-placeholder.tsx`

### Implementation Details

#### Insights Index

Mobile filters:

- Single horizontal scroll row.
- No multi-line filter block above first article.
- Preserve accessible buttons.

Article cards:

- Add a small cover area only if it improves rhythm.
- Use category-specific schematics, not generic stock imagery.

#### Article Detail

Sidebar CTA should respond to article category:

- AI article: `Discuss an AI Workflow`
- IoT article: `Discuss an IoT System`
- Energy article: `Discuss Energy Monitoring`
- Robotics article: `Discuss Robotics Training`
- Automation article: `Discuss Automation`

Missing state:

- Friendly message.
- No API/internal error language.
- Link back to insights.

### Acceptance Criteria

- Insights filters are compact on mobile.
- Broken/unavailable article states are polished.
- Article CTA feels relevant.
- Article pages remain readable and not visually noisy.

## Phase 8: Industries & Footer Polish

### Objective

Improve supporting trust and navigational clarity.

### Scope

1. Differentiate industry cards.
2. Improve footer taxonomy consistency.
3. Keep WhatsApp while preventing fixed-element clutter.
4. Clarify or remove ambiguous globe social icon.
5. Improve newsletter block separation if still needed.

### Likely Files

- `src/pages/industries.tsx`
- `src/components/layout/footer.tsx`
- `src/components/ai-chat.tsx`
- `src/components/back-to-top.tsx`

### Implementation Details

#### Industries

For each industry card:

- Add specific icon/accent.
- Add one concrete use case.
- Use a proper ghost button for action.

Avoid making the page overly decorative.

#### Footer

Taxonomy:

- Decide if Academy belongs under Company, Solutions, or both.
- Keep footer consistent with header and sitemap.

Social links:

- Replace globe icon with a real third platform if one exists.
- Otherwise remove it.

WhatsApp:

- Keep it.
- Ensure it does not compete with AI chat, cookie banner, or back-to-top on mobile.

### Acceptance Criteria

- Industries page feels sector-specific.
- Footer link grouping is consistent.
- No footer content is hidden by fixed UI elements.
- Social icons are unambiguous.

## Phase 9: QA, Accessibility, and Release Check

### Objective

Verify the polished website is stable, responsive, accessible, and ready for public traffic.

### Scope

1. TypeScript check.
2. Production build.
3. Production preview.
4. Route QA.
5. Responsive screenshot QA.
6. Accessibility sanity pass.
7. SEO/sitemap sanity pass.

### Commands

Run:

```bash
pnpm --filter @aicore/company-website typecheck
pnpm --filter @aicore/company-website build
pnpm --filter @aicore/company-website serve
```

### Route QA List

Main:

- `/`
- `/solutions`
- `/products`
- `/industries`
- `/insights`
- `/about`
- `/contact`
- `/academy`

Products:

- `/products/aicore-growthos`
- `/products/throughport-wms`
- `/products/iot-monitoring-platform`
- `/products/device-fleet-management-platform`
- `/products/smart-energy-monitoring-platform`
- `/products/ai-business-assistant-platform`

Solutions:

- `/solutions/ai-systems-and-tools`
- `/solutions/process-and-business-automation`
- `/solutions/intelligent-platforms-and-saas`
- `/solutions/embedded-iot-edge-ai`
- `/solutions/robotics-intelligent-hardware`
- `/solutions/developer-tools-engineering-utilities`
- `/solutions/mobile-cross-platform-applications`
- `/solutions/aicore-academy`

Insights:

- `/insights`
- Every article linked from the insights index.

Utility/legal:

- `/privacy`
- `/terms`
- `/sitemap`
- `/company-profile`
- `/request-demo`
- `/case-studies`
- `/partners`
- `/careers`
- `/press`
- `/portal`

### Breakpoints

Check at:

- 360x800
- 390x844
- 414x896
- 768x1024
- 1024x768
- 1280x900
- 1440x1000

### Accessibility Checks

Minimum checks:

- No unlabeled icon-only interactive buttons.
- Logo link has accessible name.
- Cookie controls are keyboard reachable.
- Mobile menu has clear open/close labels.
- Focus states are visible.
- Text contrast remains readable.
- Buttons do not wrap awkwardly.
- No horizontal scrolling on mobile.

### SEO Checks

Minimum checks:

- Page titles update correctly.
- Meta descriptions are present.
- Broken/unpublished articles are not in sitemap.
- Product routes have structured data.
- Canonical paths are correct.
- `robots.txt` and `sitemap.xml` still build.

### Final Acceptance Criteria

The website can be considered launch-polished when:

- No first-load element blocks core CTAs.
- No public route shows missing/API-error content.
- Product pages have visual proof placeholders.
- Product maturity is clearly explained.
- Mobile and tablet layouts do not clip or wrap awkwardly.
- Typecheck and production build pass.
- Key routes render in production preview.

## Suggested Execution Order

Execute in this exact order:

1. Phase 1: Global Launch Blockers.
2. Phase 2: Route & Content Integrity.
3. Phase 3: Product Credibility Structure.
4. Phase 4: Product Visual Placeholders.
5. Phase 9 partial QA for Phases 1-4.
6. Phase 5: Homepage & Navigation Polish.
7. Phase 6: Solution Page Differentiation.
8. Phase 7: Insights & Editorial Polish.
9. Phase 8: Industries & Footer Polish.
10. Phase 9 full QA and release check.

## What Not To Do Yet

Avoid these until the critical polish pass is complete:

- Full redesign.
- New brand palette.
- Large copy rewrite across every page.
- Team/founder section unless real profile content is ready.
- Generic abstract imagery everywhere.
- New animation system.
- Large component-library refactor.
- Changing `Discuss a Project` only to solve a CSS problem.

## Summary

The best path is a focused polish sprint, not a rebuild.

The first four phases matter most:

1. Remove visible blockers.
2. Fix route/content integrity.
3. Clarify product maturity and CTAs.
4. Add visual-proof placeholders for product pages.

Once those are complete, the website will already feel much more credible. The remaining phases improve rhythm, trust, and polish without destabilizing the existing direction.

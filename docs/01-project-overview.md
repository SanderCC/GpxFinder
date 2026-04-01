# Project Overview — GpxFinder

## Vision

GpxFinder is a **free, open trail-browsing platform** that lets people discover cycling, hiking, and other trails around the world. The platform aggregates trail data by crawling public sources and accepting user contributions, then enriches each trail with photos, difficulty ratings, and downloadable GPX files.

The project will remain **free forever** — no freemium model, no paywalls.

## Initial Geographic Focus

- **Belgium** (primary — first crawlers target Belgian trail sources)
- **Azores** and **Iceland** planned as early expansions
- Architecture must support worldwide coverage from the start

## Core Value Propositions

1. **Discover trails** — Browse a world map, search by city/region/trail name, filter by type (cycling, hiking, etc.)
2. **Preview before you go** — See photos along the route, view the GPX on a map, check difficulty and stats
3. **Download GPX for free** — No login required to browse or download
4. **Contribute** — Upload your own GPX files, draw routes on a map, add photos to existing trails
5. **Organize** — Save favorites, create personal trail lists (login required)

## High-Level Architecture

| Component | Technology | Hosting |
|---|---|---|
| Frontend | React + TypeScript + Vite | Azure Static Web App |
| API | .NET (ASP.NET Core) | Self-hosted server |
| Database | SQL Server + EF Core | Self-hosted server |
| Auth | .NET Identity + JWT | Part of API |
| Crawler | Background worker on the API | Part of API |
| Maps | Leaflet | Frontend |

## Key Principles

- **Anonymous-first**: Browsing, searching, viewing details, and downloading GPX files require no account
- **Login unlocks social features**: Favorites, lists, reviews, ratings, comments, trail/photo uploads
- **Legal data sourcing**: All crawled data must come from public, legally permissible sources or official APIs
- **Dark mode**: The UI ships with dark mode support
- **Metric by default**: Distances in kilometers, elevation in meters — users can switch to miles in their profile

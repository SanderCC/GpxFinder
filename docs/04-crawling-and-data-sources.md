# Crawling & Data Sources

## Architecture

- The crawler runs as a **background worker** within the .NET API project
- A **queue** processes crawl requests with **1 worker** at a time
- Crawl jobs are triggered **on demand** when a user searches an area that has not been crawled yet

## Crawl Flow

1. User searches for trails in an area (city, region, coordinates)
2. System checks if this area has been crawled before
3. If not: a crawl job is enqueued for that area
4. Frontend shows a **loading screen** and **polls regularly** for new results
5. The background worker picks up the job and crawls all configured sources for that area
6. Results are stored in the database with `SourceType = Crawled` and appropriate `SourceUrl` / `SourceName`
7. Frontend picks up new trails on next poll

## Confirmed Data Sources (Belgium Focus)

| Source | URL | Notes |
|---|---|---|
| EuroVelo Belgium | eurovelobelgium.be | Cycling routes |
| Ostbelgien | ostbelgien.be | East Belgium trails |
| RAVeL Wallonie | ravel.wallonie.be | Cycling/walking network in Wallonia |

## Sources to Explore

- **Strava** — Check Strava Metro or public segment APIs (must respect ToS)
- **Komoot** — Check if public routes/tours can be accessed via API (must respect ToS)
- **Public trail libraries** — OpenStreetMap trail data, Waymarked Trails, national/regional tourism APIs
- **Government open data portals** — Many countries publish trail/hiking data as open data
- **Wikiloc** — Large public trail database (check API availability and ToS)
- **AllTrails** — Verify if any public API or open data is available
- **National park websites** — Often publish official trail maps and GPX files

> **Important**: All sources must be **legally permissible** to crawl. Respect robots.txt, terms of service, and licensing. Prefer official APIs and open data over scraping.

## Photo Sourcing

- **Goal**: Show photos along trail routes so users can preview what they'll see
- **Requirement**: Must be legally obtained

### Approaches to Explore

1. **Google Places API** — Photos uploaded by users to Google Maps locations near trail coordinates. This is a paid API but is fully legal.
2. **Flickr API** — Search for Creative Commons licensed photos by geo-coordinates
3. **Wikimedia Commons** — Geo-tagged photos with open licenses
4. **Unsplash API** — Limited geo-search but high quality
5. **User uploads** — Users can upload their own photos to trails within GpxFinder

### Photo Metadata

Every crawled photo must store:
- Geographic coordinates (latitude, longitude) when available — for showing photos on the map
- Attribution / source info
- License type

## Trail Attribution

Every trail must display its source:
- **Crawled trails**: Show source name (e.g. "eurovelobelgium.be") with a link to the original page
- **User-created trails**: Show "Added by user" (no link to profile since profiles are private)

## Crawl State Tracking

Track which areas have been crawled to avoid redundant work:

| Field | Type | Notes |
|---|---|---|
| Id | int | |
| BoundingBox / Region | geography | Area that was crawled |
| Source | string | Which source was crawled |
| CrawledAt | DateTime | When it was last crawled |
| Status | enum | Pending, InProgress, Completed, Failed |

Consider adding a TTL so areas can be re-crawled periodically to pick up new trails.

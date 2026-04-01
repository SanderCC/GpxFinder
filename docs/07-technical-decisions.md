# Technical Decisions

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React + TypeScript + Vite | Already set up in Runnable.Web |
| Backend | ASP.NET Core (.NET) | Already set up in Runnable.API |
| Database | SQL Server | Developer preference |
| ORM | Entity Framework Core | Works with SQL Server, code-first migrations |
| Auth | ASP.NET Core Identity + JWT | Built-in user management + stateless API auth |
| Maps | Leaflet | Free, open-source, well-supported in React |
| HTTP Client | Axios | Configured in frontend with base URL from env |
| Hosting (Frontend) | Azure Static Web App | |
| Hosting (API + DB) | Self-hosted server | |

## API Configuration

- Axios instance at `src/api/axiosInstance.ts` with base URL defaulting to `https://localhost:7019`
- Production base URL configured via `VITE_API_BASE_URL` in `.env.production`

## Background Worker (Crawler)

- Runs inside the API project as a hosted background service (`IHostedService` / `BackgroundService`)
- Single worker processing a queue of crawl jobs
- Queue can be an in-memory `Channel<T>` for simplicity, or backed by a database table for persistence across restarts
- Each job targets a geographic area and iterates through all configured crawl sources

## Database Considerations

- Use EF Core code-first migrations
- Spatial data: consider using `NetTopologySuite` with EF Core for geographic queries (bounding box searches, point-in-polygon, distance calculations)
- GPX files stored as blobs (Azure Blob Storage or file system) — database stores the URL/path
- Photos stored similarly — URL reference in DB, files in blob storage or file system

## Difficulty Calculation

- Auto-calculated from: distance, elevation gain, average gradient
- Consider AI-assisted classification using a simple model or rule-based system
- Can be refined over time with user feedback data

## Unit Conversion

- All data stored in metric (kilometers, meters)
- Conversion to miles/feet happens in the frontend based on user preference
- Anonymous users see metric by default

## CORS

- API must allow CORS from the Azure SWA domain
- In development: allow `localhost` origins

## Future Considerations (not for initial build)

- Password reset via email
- Seasonal trail availability
- Rate limiting / abuse protection
- Re-crawling areas on a TTL
- Multilingual support
- Mobile app

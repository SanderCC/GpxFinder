# GpxFinder

A free trail-browsing platform that lets people discover cycling, hiking, and other trails around the world. Browse photos, check stats, and download GPX files — all for free, forever.

## Features

- **Trail discovery** — Search by city, region, or trail name on an interactive map
- **On-demand crawling** — Search an uncovered area and trails are automatically found from public sources
- **Photo previews** — See photos along the trail, placed on the map at their viewpoints
- **Free GPX downloads** — No account needed to browse or download
- **Community contributions** — Upload your own trails and photos, write reviews
- **Difficulty comparison** — See overlapping trails side by side across skill levels

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Material UI |
| Backend | ASP.NET Core (.NET) |
| Database | SQL Server, Entity Framework Core |
| Auth | ASP.NET Core Identity, JWT |
| Maps | Leaflet |
| Hosting | Azure Static Web App (frontend), self-hosted (API) |

## Project Structure

```
GpxFinder/
├── Runnable.Web/          # React frontend
├── Runnable.API/          # .NET API
├── DAL.Core/              # Data access layer (core)
├── DAL.SqlServer/         # Data access layer (SQL Server)
├── docs/                  # Requirements & specifications
└── GpxFinder.sln          # Visual Studio solution
```

## Getting Started

### Frontend

```bash
cd Runnable.Web
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default and connects to the API at `https://localhost:7019`.

### API

Open `GpxFinder.sln` in Visual Studio or Rider and run the `Runnable.API` project.

## Documentation

Detailed requirements and specifications are in the `docs/` folder:

- [Project Overview](docs/01-project-overview.md)
- [User Roles & Auth](docs/02-user-roles-and-auth.md)
- [Trail Data Model](docs/03-trail-data-model.md)
- [Crawling & Data Sources](docs/04-crawling-and-data-sources.md)
- [Frontend Pages](docs/05-frontend-pages.md)
- [API Endpoints](docs/06-api-endpoints.md)
- [Technical Decisions](docs/07-technical-decisions.md)

## License

This project is free and open for personal use.

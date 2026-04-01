# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GpxFinder is a full-stack application with a .NET 10 ASP.NET Core API backend and a React 19 + TypeScript frontend built with Vite.

## Build & Run Commands

### Backend (Runnable.API)
```bash
dotnet build Runnable.API/Runnable.API.csproj
dotnet run --project Runnable.API/Runnable.API.csproj
```
- HTTP: `http://localhost:5151`
- HTTPS: `https://localhost:7019`

### Frontend (Runnable.Web)
```bash
cd Runnable.Web
npm install
npm run dev          # Dev server with HMR
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint
npm run preview      # Preview production build
```

## Architecture

- **Runnable.API/** — ASP.NET Core 10 minimal API with OpenAPI support. Entry point: `Program.cs`.
- **Runnable.Web/** — React 19 + TypeScript SPA. Uses Vite for build tooling and Axios for HTTP calls to the backend.
- **Frontend→Backend connection**: Axios instance in `Runnable.Web/src/api/axiosInstance.ts` points to the API base URL (defaults to `https://localhost:7019`, configurable via `VITE_API_BASE_URL` env var).
- **Solution file**: `GpxFinder.sln` at the repo root includes the API project.

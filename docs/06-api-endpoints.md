# API Endpoints (Draft)

All endpoints are prefixed with `/api`. Authentication via JWT bearer token where noted.

## Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /auth/register | No | Register new user |
| POST | /auth/login | No | Login, returns JWT |

## Trails

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /trails | No | Search/filter trails (supports query params: lat, lng, radius, city, region, name, type, difficulty, surfaceType, minDistance, maxDistance, page, pageSize) |
| GET | /trails/{id} | No | Get trail details |
| GET | /trails/{id}/gpx | No | Download GPX file |
| GET | /trails/{id}/photos | No | Get trail photos |
| GET | /trails/{id}/reviews | No | Get trail reviews |
| GET | /trails/{id}/overlapping | No | Get overlapping/similar trails |
| POST | /trails | Yes | Create trail (upload GPX or drawn route) |
| POST | /trails/{id}/photos | Yes | Upload photo to trail |
| POST | /trails/{id}/reviews | Yes | Add review/rating |
| POST | /trails/{id}/dislike | Yes | Dislike a trail |
| DELETE | /trails/{id}/dislike | Yes | Remove dislike |

## User Profile

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /profile | Yes | Get current user profile |
| PUT | /profile | Yes | Update profile (name, hometown, unit preference) |
| PUT | /profile/password | Yes | Change password |

## Favorites

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /favorites | Yes | Get user's favorite trails |
| POST | /favorites/{trailId} | Yes | Add trail to favorites |
| DELETE | /favorites/{trailId} | Yes | Remove from favorites |

## Trail Lists

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /lists | Yes | Get user's trail lists |
| POST | /lists | Yes | Create a new list |
| PUT | /lists/{id} | Yes | Update list name |
| DELETE | /lists/{id} | Yes | Delete list |
| POST | /lists/{id}/trails/{trailId} | Yes | Add trail to list |
| DELETE | /lists/{id}/trails/{trailId} | Yes | Remove trail from list |

## Crawl

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | /crawl/search | No | Trigger a crawl for an area (lat, lng, radius or region name) |
| GET | /crawl/status/{jobId} | No | Poll crawl job status |

## Moderation (Moderator+)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /moderation/queue | Mod | Get trails pending moderation |
| POST | /moderation/trails/{id}/reinstate | Mod | Reinstate an offline trail |
| DELETE | /moderation/trails/{id} | Mod | Permanently remove trail |
| DELETE | /moderation/photos/{id} | Mod | Remove a photo |

## Admin (Admin only)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /admin/users | Admin | List users |
| POST | /admin/users/{id}/promote | Admin | Promote user to moderator |
| POST | /admin/users/{id}/demote | Admin | Demote moderator to regular user |

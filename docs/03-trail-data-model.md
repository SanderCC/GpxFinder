# Trail Data Model

## Trail Entity — Core Fields

| Field | Type | Notes |
|---|---|---|
| Id | GUID / int | Primary key |
| Name | string | Trail name |
| Description | string (nullable) | Optional description |
| TrailType | enum (flags) | Cycling, Hiking, etc. — supports multiple |
| SurfaceType | flags enum | Paved, Gravel, Dirt, Sand, etc. — supports multiple |
| DifficultyLevel | enum | Beginner, Experienced, Advanced |
| DistanceKm | decimal | Total distance in kilometers |
| ElevationGainMeters | decimal | Total ascent in meters |
| EstimatedDurationMinutes | int | Estimated time to complete |
| IsDogFriendly | bool | |
| GpxFileUrl | string | Path/URL to the stored GPX file |
| SourceType | enum | `Crawled` or `UserCreated` |
| SourceUrl | string (nullable) | Link back to original page (for crawled trails) |
| SourceName | string (nullable) | Display name of source (e.g. "eurovelobelgium.be") |
| CreatedByUserId | GUID (nullable) | Set when SourceType is UserCreated |
| Latitude | double | Center point for map positioning |
| Longitude | double | Center point for map positioning |
| Country | string | |
| Region | string (nullable) | Province, state, island group, etc. |
| City | string (nullable) | Nearest city |
| DislikeCount | int | Incremented by user dislikes |
| IsOffline | bool | Set to true when DislikeCount >= 3 |
| Status | enum | Active, PendingModeration, Removed |
| CreatedAt | DateTime | |
| UpdatedAt | DateTime | |

## Trail Type Enum (Flags)

```
[Flags]
enum TrailType
{
    Cycling = 1,
    Hiking = 2,
    Running = 4,
    MountainBiking = 8,
    Gravel = 16,
    Walking = 32
}
```

## Surface Type Enum (Flags)

```
[Flags]
enum SurfaceType
{
    Paved = 1,
    Gravel = 2,
    Dirt = 4,
    Sand = 8,
    Rock = 16,
    Grass = 32,
    Mixed = 64
}
```

## Difficulty Calculation

Difficulty should be **auto-calculated** using a combination of:

- Total distance
- Elevation gain
- Average gradient

Consider using **AI-assisted classification** to improve accuracy over time, especially when user feedback / ratings are available.

## Related Entities

### TrailPhoto

| Field | Type | Notes |
|---|---|---|
| Id | GUID / int | |
| TrailId | FK | |
| PhotoUrl | string | |
| Latitude | double (nullable) | For showing photos on the map at viewpoints |
| Longitude | double (nullable) | |
| UploadedByUserId | GUID (nullable) | Null if crawled |
| Source | enum | `Crawled` or `UserUploaded` |
| CreatedAt | DateTime | |

### TrailReview

| Field | Type | Notes |
|---|---|---|
| Id | GUID / int | |
| TrailId | FK | |
| UserId | FK | |
| Rating | int | 1-5 stars |
| Comment | string (nullable) | |
| CreatedAt | DateTime | |

### UserFavorite

| Field | Type | Notes |
|---|---|---|
| UserId | FK | Composite key |
| TrailId | FK | Composite key |
| CreatedAt | DateTime | |

### UserTrailList

| Field | Type | Notes |
|---|---|---|
| Id | GUID / int | |
| UserId | FK | |
| Name | string | e.g. "Summer 2026 plans" |
| CreatedAt | DateTime | |

### UserTrailListItem

| Field | Type | Notes |
|---|---|---|
| ListId | FK | Composite key |
| TrailId | FK | Composite key |
| AddedAt | DateTime | |

### TrailDislike

| Field | Type | Notes |
|---|---|---|
| UserId | FK | Composite key (one dislike per user per trail) |
| TrailId | FK | Composite key |
| CreatedAt | DateTime | |

## Overlapping Trails

Trails that **geographically overlap** should be linked and suggested to the user. This allows comparing:

- A beginner-friendly short loop vs. an advanced long route in the same area
- Different trail types covering similar terrain

Implementation: calculate overlap based on GPX coordinate proximity (e.g. percentage of points within X meters of another trail's points). Store as a many-to-many relationship or compute on the fly.

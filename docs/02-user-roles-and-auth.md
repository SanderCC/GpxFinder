# User Roles & Authentication

## Authentication

- **Technology**: ASP.NET Core Identity with JWT bearer tokens
- **Password reset**: Not required for initial release; plan for it later
- **Anonymous access**: All read operations (browse, search, view details, download GPX) work without login

## Registration Fields

| Field | Required | Notes |
|---|---|---|
| First name | Yes | |
| Last name | Yes | |
| Email | Yes | Used as login identifier |
| Password | Yes | |
| Hometown | Yes | Used for personalization / nearby trail suggestions |

## Roles

### Regular User (default)

- Browse and search trails
- Download GPX files
- Upload GPX files / draw routes on a map to create trails
- Upload photos to existing trails
- Save trails as favorites
- Create and manage personal trail lists
- Write reviews, ratings, and comments on trails
- Switch distance unit (km / miles) in profile

### Moderator (assigned by Admin)

- Everything a regular user can do
- Remove or edit trails
- Remove or add photos
- Moderate flagged content (trails with 3+ dislikes)

### Admin

- Everything a moderator can do
- Promote users to Moderator role
- Full system management

## Profile Page

- Minimal design
- **Private only** — no public profiles
- Shows: name, hometown, unit preference (km/miles)
- Links to: favorite trails, personal lists, uploaded trails
- Editable fields: first name, last name, hometown, unit preference, password

## Content Moderation via Dislikes

- Any logged-in user can dislike a trail
- When a trail accumulates **3 dislikes**, it is automatically taken offline
- Taken-offline trails enter a moderator approval queue
- A moderator can reinstate or permanently remove the trail

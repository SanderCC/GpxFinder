# Frontend Pages & UX

## Theme

- **Dark mode** by default
- Minimalistic, clean design

## Pages

### 1. Home Page

- Minimalistic landing page
- Explains what GpxFinder is and its purpose
- Shows how to find trails (search bar / map link)
- Explains that users can trigger crawling for uncovered areas
- Call-to-action to start exploring

### 2. Trail Search / Map Page

This is the main page of the application.

**Map (Leaflet)**
- Full interactive map showing trails
- **Clustered markers**: When zoomed out, show a circle/pointer with a number indicating how many trails are in that area
- Clicking a cluster zooms in and shows sub-clusters or individual trails
- Clicking an individual trail marker shows a **preview popup** with:
  - Trail name
  - A few preview photos (carousel or grid)
  - The **last photo is blurred** with a prompt to "View details" — this drives users to the detail page
  - Quick stats: distance, elevation, type, difficulty

**Filters / Search**
- Search bar: type a city name, region, or trail name
- Filter by trail type (cycling, hiking, etc.)
- Filter by difficulty (beginner, experienced, advanced)
- Filter by distance range
- Filter by surface type

**Uncovered Area Behavior**
- When a user searches an area with no results and it hasn't been crawled:
  - Show a message: "This area hasn't been explored yet. Searching for trails..."
  - Display a loading/progress indicator
  - Frontend polls the API at regular intervals for new results
  - New trails appear on the map as they are found

### 3. Trail Detail Page

**Header**
- Trail name, type badge(s), difficulty badge, source attribution (with link if crawled)
- Key stats: distance (km or miles based on user preference), elevation gain, estimated duration, surface type, dog-friendly indicator

**Photo Gallery**
- Browse through all photos of the trail
- Photos are shown in a gallery / carousel format

**Map Section**
- Leaflet map showing the full GPX route
- **Photos plotted on the map** at their geographic coordinates — so users can see where the viewpoints are
- Clicking a photo marker on the map opens that photo

**GPX Download**
- Prominent download button — **no login required**

**Overlapping Trails**
- Section showing trails that overlap geographically
- Each suggestion shows: name, difficulty, distance, type
- Helps users compare beginner vs advanced routes in the same area

**Reviews & Comments** (login required)
- Star rating (1-5)
- Text comments
- Dislike button (contributes to the 3-dislike auto-offline mechanism)

### 4. Login Page

- Email + password
- Link to register page

### 5. Register Page

- Fields: first name, last name, email, password, hometown
- After registration, redirect to map page or previous location

### 6. Profile Page (login required)

- Minimal design
- View/edit: first name, last name, hometown
- Toggle distance unit: kilometers / miles
- Change password
- Links to:
  - Favorite trails
  - Personal trail lists
  - Uploaded trails

### 7. Create Trail Page (login required)

Two modes:
1. **Upload GPX** — Upload a GPX file, system extracts route, distance, elevation
2. **Draw on map** — Use a Leaflet drawing tool to mark a route manually

After route is provided:
- Add trail name, description, type, surface type, dog-friendly toggle
- Upload photos (optional)
- Submit — trail is immediately public

### 8. My Favorites Page (login required)

- List of favorited trails with quick stats
- Link to detail page for each

### 9. My Lists Page (login required)

- Create / manage named lists (e.g. "Summer 2026 plans")
- Add/remove trails from lists
- View list contents with trail cards

### 10. Admin / Moderator Dashboard (role-gated)

- **Moderator queue**: Trails taken offline (3+ dislikes) awaiting review
- Ability to reinstate or permanently remove trails
- Manage photos (remove inappropriate content)
- **Admin only**: Promote users to moderator role

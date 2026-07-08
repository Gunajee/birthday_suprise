# 💍 Proposal Backend — Spring Boot + Mailjet + MySQL

Receives events from the birthday/proposal frontend and sends you an
**instant email via Mailjet** the moment she finds the hidden proposal.

## Setup

### 1. Create the database
```sql
CREATE DATABASE birthday_db;
```

### 2. Get Mailjet credentials
1. Sign up free at https://www.mailjet.com
2. Verify a sender email/domain: **Account → Sender domains & addresses**
3. Grab your API Key + Secret: **Account → API Key Management**

### 3. Configure
Copy the example properties file and fill in real values:
```bash
cp src/main/resources/application-example.properties src/main/resources/application.properties
```

Edit `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

mailjet.api.key=YOUR_MAILJET_API_KEY
mailjet.api.secret=YOUR_MAILJET_API_SECRET
mailjet.sender.email=no-reply@yourdomain.com     # must be a Mailjet-verified sender
mailjet.sender.name=Birthday Surprise Bot

mailjet.notify.email=your-real-email@example.com  # ← YOU receive the alert here
mailjet.notify.name=Me

app.cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

### 4. Run
```bash
mvn spring-boot:run
```
Backend starts on **http://localhost:8080**.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/proposal-found` | Called the instant the frontend detects the hidden proposal. Saves the event + sends you a Mailjet email immediately. |
| POST | `/api/proposal-answer` | Called when she taps "Yes ❤️" or "Need Some Time 😊". Sends a follow-up email. |
| POST | `/api/secret-found` | Optional — logs each of the 30 hidden secrets as she discovers them. |
| GET  | `/api/secrets` | View everything she's found so far (handy for a quick check via browser/Postman). |

## Email Preview

When she finds the proposal, you instantly receive an email like:

> **💍 SHE FOUND THE PROPOSAL!**
> She just discovered the hidden proposal on your birthday website!
> Found at: 2025-06-25T14:32:10
> Device: Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)...
> Go check in with her. 💖

And when she answers:

> **❤️ SHE SAID YES!!!**
> Answered at: 2025-06-25T14:33:02

## Connecting the Frontend

In the React app's `.env`:
```
VITE_API_BASE_URL=http://localhost:8080
```
That's it — `src/utils/api.js` in the frontend already calls these endpoints.

## Database Schema (auto-created via Hibernate)

**proposal_events**
| column | type |
|---|---|
| id | BIGINT (PK) |
| found_at | DATETIME |
| user_agent | VARCHAR(512) |
| answer | VARCHAR(16) — "yes" / "wait" / null |
| answered_at | DATETIME |
| email_sent | BOOLEAN |

**secrets_found**
| column | type |
|---|---|
| id | BIGINT (PK) |
| secret_name | VARCHAR(255) |
| found_at | DATETIME |

## Security Note

This is a personal-project backend with no authentication on the API,
since it's meant to run privately for a single recipient. If you deploy
it publicly, consider adding a simple shared-secret header check or
Spring Security with a single API key, since these endpoints currently
accept requests from anyone who knows the URL.

## Production Deployment Tips

- Use a managed MySQL instance (PlanetScale, AWS RDS, Railway, etc.)
- Set `spring.jpa.hibernate.ddl-auto=validate` in production after the
  first run (avoid auto-altering schema on every deploy)
- Store secrets (Mailjet keys, DB password) as environment variables,
  not in `application.properties`, when deploying to Heroku/Railway/Render:
  ```properties
  mailjet.api.key=${MAILJET_API_KEY}
  mailjet.api.secret=${MAILJET_API_SECRET}
  spring.datasource.password=${DB_PASSWORD}
  ```

## 🛠️ Admin CMS Endpoints

In addition to the proposal/secret-tracking endpoints above, this backend
also powers the frontend's `/admin` content management dashboard.

### Authentication

All `/api/admin/**` endpoints (except `/api/admin/login`) require a header:
```
X-Admin-Password: <value of admin.password in application.properties>
```
Requests without it, or with the wrong value, get `401 Unauthorized`.

### Content CRUD

Each content type below supports the same pattern:
```
GET    /api/admin/{resource}            → list all
GET    /api/admin/{resource}/{id}       → get one
POST   /api/admin/{resource}            → create
PUT    /api/admin/{resource}/{id}       → update
DELETE /api/admin/{resource}/{id}       → delete
PUT    /api/admin/{resource}/reorder    → body: [id1, id2, id3, ...] — saves new sort order
```

| Resource | Entity |
|---|---|
| `/api/admin/quotes` | Quote |
| `/api/admin/greetings` | Greeting |
| `/api/admin/story-chapters` | StoryChapter |
| `/api/admin/kavithai` | Kavithai |
| `/api/admin/songs` | Song |
| `/api/admin/videos` | Video |
| `/api/admin/memory-gallery` | MemoryGalleryItem |
| `/api/admin/hero` (GET/PUT only — singleton) | HeroSettings |

Matching **public, unauthenticated** read-only mirrors exist at
`/api/quotes`, `/api/greetings`, `/api/story-chapters`, `/api/kavithai`,
`/api/songs`, `/api/videos`, `/api/memory-gallery`, `/api/hero` — these are
what the live birthday site would read from if wired up (see the frontend
README's "Connecting Admin Data to the Public Site" section).

### File Uploads

```
POST /api/admin/upload   (multipart/form-data, field name: "file")
→ { "url": "http://localhost:8080/uploads/<generated-name>.<ext>" }
```

Uploaded files are stored on local disk under the `upload.dir` path
(default: `uploads/` relative to where the app runs) and served back at
`/uploads/**`. For production, point `upload.dir` at a persistent volume,
or swap `FileStorageService` for an S3/Cloudinary-backed implementation —
every other part of the app only depends on getting a URL string back.

```properties
upload.dir=uploads
upload.public-base-url=http://localhost:8080/uploads
spring.servlet.multipart.max-file-size=100MB
spring.servlet.multipart.max-request-size=100MB
```

### Security Note (same caveat as above, repeated for visibility)

The admin password check is a simple shared-secret header — intentionally
minimal for a single-admin personal project. If deployed publicly long-term,
upgrade to Spring Security with hashed credentials and rate-limiting on
`/api/admin/login`.

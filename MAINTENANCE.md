# Dive Platform Stability & Maintenance Guide

This document provides a recovery and maintenance framework for the Dive platform to ensure long-term stability and prevent recurring "breakage."

## 🛠 Core Infrastructure Checklist

### 1. Environment Variables
The platform relies on the following variables in `.env.local`. If these are missing or incorrect, the site will appear broken or fetch no data.

| Variable | Purpose | Required For |
|----------|---------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API endpoint | All Data Fetching |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | Client-side Auth & Data |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin access | Scrapers & Webhooks |
| `CRON_SECRET` | Vercel Cron protection | Automated Ingestion |
| `COMPOSIO_WEBHOOK_SECRET` | Webhook verification | Real-time Updates |

### 2. Database Health
If you see a blank screen in the dashboard or feed:
- **Check Table Existence**: Ensure `users`, `opportunities`, `saved_opportunities`, and `documents` tables exist in Supabase.
- **Enable Realtime**: Go to Supabase Dashboard -> Database -> Replication and ensure the `opportunities` table is added to the `supabase_realtime` publication.
- **RLS Policies**: Ensure Row Level Security (RLS) policies allow users to read their own data and read all active opportunities.

## 🚀 Data Ingestion & Automation

### Automated Scrapers
The scrapers run every hour via Vercel Cron. To manually trigger a refresh:
1. Navigate to `/api/ingest?secret=YOUR_CRON_SECRET`.
2. Check the console logs for "Ingestion complete."

### Real-time Webhooks (Composio)
Real-time data enters via `app/api/webhooks/composio/route.ts`. 
- **Endpoint**: `https://your-domain.com/api/webhooks/composio`
- **Secret**: Must match `COMPOSIO_WEBHOOK_SECRET`.

## 🏗 Build & Deployment Stability

### Resolution of Common Errors
- **TypeScript Errors**: If the build fails, run `npx tsc --noEmit` to identify type mismatches.
- **Hydration Mismatch**: Usually caused by using `new Date()` or `Math.random()` directly in the render logic without `useEffect`.
- **Framer Motion**: Ensure properties like `boxShadow` are used instead of `shadow` to avoid build-time errors.

### Verified Build Command
Always run this before pushing to production:
```bash
npm run build
```

## 🛡️ Safety Nets & Error Boundaries

We have implemented several guards to prevent the "blank screen" issue from recurring:

1. **ErrorBoundary**: Wrapped around the `DashboardLayout`. If a component fails (e.g., a chart crashes), the system will display a graceful "Something went wrong" message with a **Reload** button instead of crashing the entire page.
2. **Dashboard Loading States**: A global `loading.tsx` ensures that while data is being synchronized from Supabase, the user sees a professional animated skeleton rather than an empty white screen.
3. **Graceful Failures**: Data fetching logic in the `Feed` and `Dashboard` now includes try/catch blocks that return empty arrays instead of throwing uncaught exceptions.

## 🆘 Troubleshooting "Broken" States

| Symptom | Probable Cause | Fix |
|---------|----------------|-----|
| Blank Feed | Supabase order/select failure | Check `.env` keys and database connection. |
| "Something went wrong" | Client-side runtime crash | Click **Reload**. Check browser console for specific JS errors. |
| Logout on Refresh | Middleware session issue | Ensure `updateSession` in `lib/supabase/middleware.ts` is correctly passing cookies. |
| No Real-time Updates | Replication disabled | Enable `opportunities` in Supabase Replication settings. |
| Distorted UI | CSS/Tailwind cache | Run `rm -rf .next` and restart dev server. |
| 404 Static Assets | Stale Build Cache | Kill process on port 3000, delete `.next`, and restart. |
| Infinite Loading | Network timeout/blocking | Check if Supabase URL is reachable from your network. |

## 🛠️ Developer Recovery Commands

If the site is "broken" with 404 errors in the console (F12), run these commands in your terminal:

### Quick Reset (Clear Cache)
```powershell
# Stop the server (Ctrl+C) then run:
Remove-Item -Recurse -Force .next; npm run dev
```

### Full Reset (Kill Stuck Process & Clear Cache)
If port 3000 is "already in use" or won't stop:
```powershell
# Find and kill the process
$pid = (Get-NetTCPConnection -LocalPort 3000).OwningProcess
if ($pid) { taskkill /F /PID $pid }

# Clear cache and restart
cmd /c "rd /s /q .next"
npm run dev
```

---
*Last Updated: May 16, 2026*

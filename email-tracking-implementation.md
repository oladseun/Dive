# Phase 3: Email Confirmation Tracking Architecture

This document outlines the technical blueprint for implementing automatic application tracking by parsing confirmation emails. This architecture connects the Gmail API with your Next.js and Supabase stack.

## Overview
Instead of scraping external websites, we will use OAuth to securely read the user's incoming emails and use Google Cloud Pub/Sub to listen for "Application Submitted" emails in real-time.

---

## 1. Google Cloud Configuration (The Foundation)
Before writing code, configure your Google Cloud project to allow email reading and push notifications.

1. **Create Project**: Go to the Google Cloud Console and create a new project.
2. **Enable APIs**: Enable the **Gmail API** and the **Cloud Pub/Sub API**.
3. **OAuth Consent Screen**:
   - Configure the consent screen for your users.
   - Request the specific read-only scope: `https://www.googleapis.com/auth/gmail.readonly`.
4. **Setup Pub/Sub Topic**: Create a Pub/Sub topic. This allows Google to send a server-to-server push notification to your backend whenever a user receives a new email, preventing the need to constantly poll the API.

---

## 2. Authentication Flow (Next.js)
You need to authenticate users and securely store their offline access tokens so your server can fetch emails in the background.

1. Build a "Connect Gmail" integration button on the Dive dashboard.
2. Use NextAuth.js or Supabase Auth configured with the Google Provider. Ensure you request offline access to receive a `refresh_token`.
3. Save the `refresh_token` securely in your Supabase database (e.g., in a `user_integrations` table) linked to the user's `id`.

---

## 3. Webhook Listener (Next.js API Route)
Create an API endpoint that Google can ping when an email arrives.

1. Create a new route: `app/api/webhooks/gmail/route.ts`.
2. In Google Cloud Pub/Sub, configure your subscription to push notifications to `https://your-domain.com/api/webhooks/gmail`.
3. When an email arrives, Google will send a POST request payload containing the user's email address and a `historyId`.

---

## 4. Fetching & Processing Logic
Inside your webhook route (`app/api/webhooks/gmail/route.ts`), you will process the incoming notification.

1. **Lookup**: Query Supabase to find the user associated with the email address in the notification and retrieve their `refresh_token`.
2. **Fetch**: Use the `googleapis` npm package to fetch the actual email contents (Headers, Subject, Snippet/Body) using the `refresh_token`.
3. **Filter & Match**:
   - Extract the `From` address, `Subject`, and email body.
   - Query the `opportunities` table in Supabase for the user's active roadmaps.
   - Run a logic check: Does the `From` domain match the opportunity organizer (e.g., `@ycombinator.com`)? Do the Subject or Body contain success keywords (e.g., "Application Received", "Successfully Submitted")?

---

## 5. Supabase Realtime UI Update
If a positive match is established, update the database to reflect the completed task.

1. **Database Update**: Use the Supabase Admin Client (to bypass Row Level Security in your backend server) to update the task:
   ```typescript
   await supabaseAdmin
     .from('tasks')
     .update({ is_complete: true, status: 'completed' })
     .eq('opportunity_id', matchedOpportunityId)
     .eq('user_id', userId)
     .ilike('title', '%Submit Application%');
   ```
2. **Realtime UI Sync**: Because the `TaskList` component on the frontend is already (or will be) subscribed to Supabase Realtime changes for the `tasks` table, the UI will instantly update. The user will see the final box automatically tick itself.

---

## Required Technologies
- **Google Cloud Console**: For OAuth and Pub/Sub setup.
- **`googleapis` npm package**: The official library to interact with the Gmail API via Node.js.
- **Next.js App Router**: For the serverless webhook endpoint (`/api/...`).
- **Supabase `@supabase/supabase-js`**: Utilizing the Service Role Key to force background database updates.

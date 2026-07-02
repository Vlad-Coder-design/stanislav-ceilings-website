# Photo Upload Setup

This static site uses Firebase Auth + Firebase Storage for the public gallery.

## Firebase Console

1. Create a Firebase project.
2. Enable Authentication and add the Google provider.
3. Enable Firebase Storage.
4. Add this site domain to Authentication > Settings > Authorized domains:
   - your Vercel production domain
   - your Vercel preview domain if you want to test uploads there
   - `localhost` for local testing
5. In Project settings > Web app, copy the Firebase config into `firebaseConfig` in `index.html`.
6. Publish the Storage rules from `firebase-storage.rules`.

## Permissions

Visitors can read `project-photos/*`.

Only the signed-in Google account `petrostanislav@gmail.com` can upload, update, or delete image files in `project-photos/*`.

## CLI Deployment

After installing and logging in to the Firebase CLI:

```bash
firebase login
firebase use --add
firebase deploy --only storage
```

After installing and logging in to the Vercel CLI:

```bash
vercel
vercel --prod
```

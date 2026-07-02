# Free Photo Gallery Workflow

The website gallery is free: it reads public image files from this GitHub folder:

`assets/projects/`

## Add Photos

1. Open the GitHub repository.
2. Go to `assets/projects/`.
3. Click **Add file** -> **Upload files**.
4. Upload `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif` images.
5. Commit the upload to `main`.

Vercel will redeploy automatically, and the website will show the images.

## Permissions

Only GitHub users with write access to the repository can add photos.

Invite `petrostanislav@gmail.com` to the repository as a collaborator with write access. After he accepts the GitHub invitation, he can use the **Додати фото** button on the live website to open the upload page.

Everyone can view the published photos on the website.

No Firebase Storage, Blaze plan, or paid backend is required.

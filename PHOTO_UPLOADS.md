# Website Photo Uploads

The gallery reads public image files from this GitHub folder:

`assets/projects/`

## How Uploads Work

Visitors can view photos. The upload form on the website sends a resized photo to `/api/upload-photo`, and that Vercel function commits it into `assets/projects/`.

The upload form needs two Vercel environment variables:

- `GITHUB_UPLOAD_TOKEN`: a fine-grained GitHub token with **Contents: Read and write** access for this repository.
- `UPLOAD_CODE`: a private code shared only with the person allowed to upload photos.

After setting or changing environment variables, redeploy the site.

## How To Add Photos

1. Open the live website.
2. Click **Додати фото**.
3. Enter the private upload code.
4. Choose a photo.
5. Click **Завантажити**.

The website compresses the image before upload, commits it to GitHub, and refreshes the gallery.

## Access Control

Only someone who knows `UPLOAD_CODE` can use the website upload form. Keep the GitHub token private in Vercel; never put it into `index.html`.

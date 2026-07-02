const REPO_OWNER = 'Vlad-Coder-design';
const REPO_NAME = 'stanislav-ceilings-website';
const TARGET_DIR = 'assets/projects';
const MAX_BASE64_LENGTH = 4_200_000;

const json = (response, status, payload) => {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
};

const safeFilename = (filename) => {
  const cleaned = String(filename || '')
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!cleaned || !/\.jpe?g$/i.test(cleaned)) return null;
  return cleaned.slice(0, 120);
};

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    json(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const token = process.env.GITHUB_UPLOAD_TOKEN;
  const uploadCode = process.env.UPLOAD_CODE;

  if (!token || !uploadCode) {
    json(response, 500, { error: 'Upload is not configured yet.' });
    return;
  }

  const { code, filename, contentBase64 } = request.body || {};

  if (code !== uploadCode) {
    json(response, 403, { error: 'Wrong upload code.' });
    return;
  }

  const cleanName = safeFilename(filename);
  if (!cleanName) {
    json(response, 400, { error: 'Invalid file name.' });
    return;
  }

  if (
    typeof contentBase64 !== 'string' ||
    contentBase64.length < 100 ||
    contentBase64.length > MAX_BASE64_LENGTH ||
    !/^[A-Za-z0-9+/=]+$/.test(contentBase64)
  ) {
    json(response, 400, { error: 'Invalid image data.' });
    return;
  }

  const path = `${TARGET_DIR}/${cleanName}`;
  const githubResponse = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `Add project photo ${cleanName}`,
        content: contentBase64,
        branch: 'main',
      }),
    },
  );

  const githubResult = await githubResponse.json().catch(() => ({}));
  if (!githubResponse.ok) {
    json(response, githubResponse.status, {
      error: githubResult.message || 'GitHub upload failed.',
    });
    return;
  }

  json(response, 200, {
    ok: true,
    path,
    url: githubResult.content?.download_url || null,
  });
};

const PROJECT_ID = 'vftxng62';
const DATASET = 'production';
const API_VERSION = 'v2021-10-21';
const PERSPECTIVE = process.env.NODE_ENV === 'production' ? 'published' : 'previewDrafts'
const DRAFT_MODE = process.env.NODE_ENV === 'production' ? '' : '&perspective=previewDrafts';

module.exports = {
  PROJECT_ID,
  DATASET,
  API_VERSION,
  PERSPECTIVE,
  DRAFT_MODE,
};

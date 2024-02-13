const { PERSPECTIVE, PROJECT_ID, API_VERSION, DATASET } = require('../../config');
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: API_VERSION,
  perspective: PERSPECTIVE,
});

const fetchSanity = async (query, { isPreview } = {}) => {
  if (isPreview) {
    client.config({ perspective: 'previewDrafts' });
  }

  try {
    const result = await client.fetch(query);
    return { result };
  } catch (error) {
    console.log('Error fetching data from Sanity:', error);
    return { error };
  }
};

module.exports = { fetchSanity };

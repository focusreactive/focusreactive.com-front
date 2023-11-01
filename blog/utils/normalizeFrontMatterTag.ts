const { kebabCase } = require('lodash');
const normalizeUrl = require('./normalizeUrl.ts');

function normalizeFrontMatterTag(tagsPath, frontMatterTag) {
  function toTagObject(tagString) {
    return {
      label: tagString,
      permalink: kebabCase(tagString),
    };
  }

  // TODO maybe make ensure the permalink is valid url path?
  function normalizeTagPermalink(permalink) {
    // Note: we always apply tagsPath on purpose. For versioned docs, v1/doc.md
    // and v2/doc.md tags with custom permalinks don't lead to the same created
    // page. tagsPath is different for each doc version
    return normalizeUrl([tagsPath, permalink]);
  }

  const tag = typeof frontMatterTag === 'string' ? toTagObject(frontMatterTag) : frontMatterTag;

  return {
    label: tag.label,
    permalink: normalizeTagPermalink(tag.permalink),
  };
}

module.exports = normalizeFrontMatterTag;

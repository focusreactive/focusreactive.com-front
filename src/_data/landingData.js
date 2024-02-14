const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const dynamicSlug = params.eleventy?.serverless?.query?.slug;
  const isPreview = !!dynamicSlug;
  // get single landing page by slug in preview mode
  const querySelect = dynamicSlug
    ? `*[_type == "landingPage" && path.current == "${dynamicSlug}"]`
    : `*[_type == "landingPage"]`;
  const query = `${querySelect} {
    ...,
    blocks[] {
      ...,
      "image": image.asset->.url,
      "bgImage": bgImage.asset->.url,
      partners[] {
        ...,
        "image": image.asset->.url,
      },
      elements[] {
        ...,
        "image": image.asset->.url,
      },
      members[] {
        ...,
        "avatar": avatar.asset->.url
      }
    },
    seo {
      ...,
      ogTags {
        ...,
        "image": image.asset->.url,
      },
      ogTwitter {
        ...,
        "image": image.asset->.url,
      }
    },

    footer->
  }`;
  const landingData = await fetchSanity(query, { isPreview });
  const result = landingData.result.filter((d) => d.path?.current);

  if (isPreview) {
    return result[0];
  }

  return result;
};

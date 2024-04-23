const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "cmsKitPage"][0] {
    ...,
    blocks[] {
      ...,
      "image": image.asset->.url,
      "bgImage": bgImage.asset->.url,
      "icon": icon.asset->.url,

      items[] {
        ...,
        "icon": icon.asset->.url,
        logos[] {
          "image": asset->.url,
        },
      },
      "authorAvatar": authorAvatar.asset->.url,
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
  const cmsKitData = await fetchSanity(query, { isPreview });

  return cmsKitData.result;
};

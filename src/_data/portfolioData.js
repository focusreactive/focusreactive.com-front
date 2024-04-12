const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "portfolioPage"][0] {
    ...,
    portfolio {
      ...,
      elements[] {
        ...,
        "logo": logo.asset->.url,
        "background": background.asset->.url,

        portfolioTechnologies[] {
          ...,
          items[] {
            ...,
            "icon": icon.asset->.url
          }
        }

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
  const portfolioData = await fetchSanity(query, { isPreview });

  return portfolioData.result;
};

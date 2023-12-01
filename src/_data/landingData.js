const fetch = require('node-fetch');
const { PROJECT_ID, DATASET, API_VERSION } = require('../../config');

const query = `*[_type == 'landingPage' && !(_id in path("drafts.**"))] {
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

module.exports = async (params) => {
  const dynamicSlug = params.eleventy?.serverless?.query?.slug;

  let QUERY = encodeURIComponent(query);
  if (dynamicSlug) {
    QUERY = encodeURIComponent(
      `coalesce(*[_type == "landingPage" && path.current == "${dynamicSlug}" && _id in path("drafts.**")][0],*[_type == "landingPage" && path.current == "${dynamicSlug}"][0]{
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
        "image": image.asset->.url
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
  })`,
    );
  }

  // Compose the URL for your project's endpoint and add the query
  const URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;

  const data = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return data?.result?.length ? data.result : [data.result];
};

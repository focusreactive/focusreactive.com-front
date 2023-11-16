const fetch = require('node-fetch');
const { PROJECT_ID, DATASET, API_VERSION } = require('../../config');

const query = `*[_type == 'mainPage'][0] {
    ...,
    clients {
      ...,
      clients[] {
        ...,
        "logo": logo.asset->.url
      }
    },
    events {
      ...,
      "bgImage": bgImage.asset->.url
    },
    team {
      ...,
      members[] {
        ...,
        members[] {
          ...,
          "avatar": avatar.asset->.url
        }
      }
    },
    techs {
      title,
      subTitle,
      spheres[] {
        title,
        list[] {
          title,
          link,
          isPartner,
          'src': src.asset->url
        }
      }
    },
    footer->
  }`;

module.exports = async (params) => {
  const dynamicSlug = params.eleventy?.serverless?.query?.slug;

  let QUERY = encodeURIComponent(query);
  if (dynamicSlug) {
    QUERY = encodeURIComponent(
      `coalesce(*[_type == "mainPage" && _id in path("drafts.**")][0],*[_type == "mainPage"][0]{
    ...,
    clients {
      ...,
      clients[] {
        ...,
        "logo": logo.asset->.url
      }
    },
    events {
      ...,
      "bgImage": bgImage.asset->.url
    },
    team {
      ...,
      members[] {
        ...,
        members[] {
          ...,
          "avatar": avatar.asset->.url
        }
      }
    },
    techs {
      title,
      subTitle,
      spheres[] {
        title,
        list[] {
          title,
          link,
          isPartner,
          'src': src.asset->url
        }
      }
    },
    footer->
  })`,
    );
  }

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${QUERY}`;

  const mainPageData = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return mainPageData.result;
};

const { fetchSanity } = require('./common');

module.exports = async (params) => {
  const isPreview = params.eleventy?.serverless?.query?.slug;
  const query = `*[_type == "mainPage"][0] {
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
    expertise {
      ...,
      items[] {
        ...,
        items[] {
          ...,
          "image": image.asset->.url,
          technologies[] {
            ...,
            items[] {
              ...,
              "icon": icon.asset->.url
            }
          }
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
  const mainPageData = await fetchSanity(query, { isPreview });

  return mainPageData.result;
};

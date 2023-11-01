import { getLandingsLinks } from '../../utils/getLandingsLinks';

const { EleventyServerless } = require('@11ty/eleventy');

export default async function handler(request, response) {
  const { slug } = request.query;
  let path;

  switch (slug) {
    case 'about-preview': {
      path = 'about-preview';
      break;
    }
    case 'main-preview': {
      path = 'main-preview';
      break;
    }
    case 'graphics-preview': {
      path = 'graphics-preview';
      break;
    }
    case 'our-work-preview': {
      path = 'our-work-preview';
      break;
    }
    default: {
      path = 'default-preview';
      break;
    }
  }

  if (path === 'default-preview') {
    const landingPaths = getLandingsLinks();
    if (landingPaths.includes(slug)) {
      path = 'landing-preview';
    }
  }

  let elev = new EleventyServerless('serverless', {
    path: `/${path}`,
    query: {
      slug: slug.replace(`${path}/`, ''),
    },
  });

  try {
    let [page] = await elev.getOutput();
    let html = page.content;

    return response.status(200).send(html);
  } catch (e) {
    return response.status(500).json({ error: e.message });
  }
}

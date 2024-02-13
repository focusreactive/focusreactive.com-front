import { fetchSanity } from '../src/_data/common';

export const getLandingsLinks = async () => {
  const query = `*[_type == 'landingPage'].path.current`;
  const data = await fetchSanity(query, { isPreview: true });

  return data?.result?.length ? data.result : [data.result];
};

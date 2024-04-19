export const getImageDimensions = (src: string) => {
  let width, height;

  if (!src) {
    return { width, height };
  }

  const match = src.match(/(?<=-)(?<width>\d+)x(?<height>\d+)(?=.)/);

  if (!match) {
    return { width, height };
  }

  return { ...match.groups };
};
